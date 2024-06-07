import { Loan } from '../entity/loan';

export interface LoanRepository {
  createLoan(loan: Loan): Promise<void>;
  findLoanByBookCode(bookCode: string): Promise<Loan | null>;
  updateLoan(loan: Loan): Promise<void>;
  findAll(): Promise<Loan[]>;
}
