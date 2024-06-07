import { MemberService } from './member.service';
import { MemberRepository } from '../../domain/member/repository/member.repository';
import { BookRepository } from '../../domain/book/repository/book.repository';
import { LoanRepository } from '../../domain/loan/repository/loan.repository';
import { Member } from '../../domain/member/entity/member';

const mockMemberRepository = {
  findByCode: jest.fn(),
  save: jest.fn(),
  findAll: jest.fn(),
};

const mockBookRepository = {
  findByCode: jest.fn(),
  save: jest.fn(),
  findAll: jest.fn(),
};

const mockLoanRepository = {
  createLoan: jest.fn(),
  findLoanByBookCode: jest.fn(),
  updateLoan: jest.fn(),
  findAll: jest.fn(),
};

describe('MemberService', () => {
  let memberService: MemberService;

  beforeEach(() => {
    memberService = new MemberService(
      mockMemberRepository as unknown as MemberRepository,
      mockBookRepository as unknown as BookRepository,
      mockLoanRepository as unknown as LoanRepository,
    );
  });

  describe('borrowBook', () => {
    it('should throw an error if member does not exist', async () => {
      mockMemberRepository.findByCode.mockResolvedValueOnce(null);
      await expect(memberService.borrowBook('M0001', 'B001')).rejects.toThrow(
        'Member atau buku tidak ditemukan',
      );
    });
  });

  describe('returnBook', () => {
    it('should throw an error if loan does not exist', async () => {
      mockLoanRepository.findLoanByBookCode.mockResolvedValueOnce(null);
      await expect(memberService.returnBook('M0001', 'B001')).rejects.toThrow(
        'Peminjaman tidak valid atau sudah dikembalikan',
      );
    });
  });

  it('should return all members and their borrowed books count', async () => {
    const members: Member[] = [
      {
        code: 'M001',
        name: 'Angga',
        borrowedBooks: [],
      },
      {
        code: 'M002',
        name: 'Ferry',
        borrowedBooks: [],
      },
      {
        code: 'M003',
        name: 'Putri',
        borrowedBooks: [],
      },
    ];

    mockLoanRepository.findAll.mockResolvedValue([]);

    mockMemberRepository.findAll.mockResolvedValue(members);
    const result = await memberService.checkMembers();
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: expect.any(String),
          name: expect.any(String),
          borrowedBooksCount: 0,
        }),
      ]),
    );
  });
});
