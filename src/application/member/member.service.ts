import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MemberRepository } from '../../domain/member/repository/member.repository';
import { BookRepository } from '../../domain/book/repository/book.repository';
import { LoanRepository } from '../../domain/loan/repository/loan.repository';
import { Member } from '../../domain/member/entity/member';
import { Loan } from '../../domain/loan/entity/loan';

export class MemberService {
  constructor(
    @Inject('MemberRepository')
    private memberRepository: MemberRepository,
    @Inject('BookRepository')
    private bookRepository: BookRepository,
    @Inject('LoanRepository')
    private loanRepository: LoanRepository,
  ) {}

  async borrowBook(memberCode: string, bookCode: string): Promise<any> {
    const member = await this.memberRepository.findByCode(memberCode);
    const book = await this.bookRepository.findByCode(bookCode);

    if (!member || !book) {
      throw new HttpException(
        'Member atau buku tidak ditemukan',
        HttpStatus.NOT_FOUND,
      );
    }

    if (book.borrowedBy) {
      throw new HttpException('Buku sudah dipinjam', HttpStatus.BAD_REQUEST);
    }

    const newLoan = new Loan();
    newLoan.id = this.generateUniqueId();
    newLoan.memberCode = memberCode;
    newLoan.bookCode = bookCode;
    newLoan.borrowedDate = new Date();
    newLoan.returned = false;
    newLoan.returnDate = undefined;

    await this.loanRepository.createLoan(newLoan);

    book.borrowedBy = memberCode;
    await this.bookRepository.save(book);

    return newLoan;
  }

  async returnBook(memberCode: string, bookCode: string): Promise<any> {
    const loan = await this.loanRepository.findLoanByBookCode(bookCode);

    if (!loan || loan.memberCode !== memberCode || loan.returned) {
      throw new HttpException(
        'Peminjaman tidak valid atau sudah dikembalikan',
        HttpStatus.BAD_REQUEST,
      );
    }

    const today = new Date();
    const borrowedDate = new Date(loan.borrowedDate);
    const diffTime = Math.abs(today.getTime() - borrowedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    loan.returned = true;
    loan.returnDate = today;

    if (diffDays > 7) {
      const member = await this.memberRepository.findByCode(memberCode);
      if (member) {
        member.penaltyUntil = new Date(
          today.getTime() + 3 * 24 * 60 * 60 * 1000,
        );
        await this.memberRepository.save(member);
      }
    }

    await this.loanRepository.updateLoan(loan);

    const book = await this.bookRepository.findByCode(bookCode);
    if (book) {
      book.borrowedBy = null;
      await this.bookRepository.save(book);
    }

    return loan;
  }

  async addMember(memberData: Partial<Member>): Promise<any> {
    const lastMember = await this.memberRepository.findLastMember();
    const newCode = lastMember
      ? this.incrementMemberCode(lastMember.code)
      : 'M0001';

    const newMember = new Member();
    newMember.code = newCode;
    newMember.name = memberData.name;

    await this.memberRepository.save(newMember);

    return {
      status: HttpStatus.CREATED,
      message: 'Anggota berhasil ditambahkan',
      error: false,
      data: {
        code: newMember.code,
        name: newMember.name,
      },
    };
  }

  async checkMembers(): Promise<any> {
    const members = await this.memberRepository.findAll();
    const loans = await this.loanRepository.findAll();

    return members.map((member) => {
      const borrowedBooksCount = loans.filter(
        (loan) => loan.memberCode === member.code && !loan.returned,
      ).length;
      return {
        code: member.code,
        name: member.name,
        borrowedBooksCount,
      };
    });
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private incrementMemberCode(code: string): string {
    const prefix = code.slice(0, 1);
    const number = parseInt(code.slice(1), 10);
    const newNumber = number + 1;
    const newCode = `${prefix}${newNumber.toString().padStart(4, '0')}`;
    return newCode;
  }
}
