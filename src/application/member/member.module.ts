import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MemberRepositoryImpl } from '../../infrastructure/member/member.repository.impl';
import { BookRepositoryImpl } from '../../infrastructure/book/book.repository.impl';
import { LoanRepositoryImpl } from '../../infrastructure/loan/loan.repository.impl';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    {
      provide: 'MemberRepository',
      useClass: MemberRepositoryImpl,
    },
    {
      provide: 'BookRepository',
      useClass: BookRepositoryImpl,
    },
    {
      provide: 'LoanRepository',
      useClass: LoanRepositoryImpl,
    },
  ],
})
export class MemberModule {}
