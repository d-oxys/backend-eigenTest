import * as admin from 'firebase-admin';
import { Loan } from '../../domain/loan/entity/loan';
import { LoanRepository } from '../../domain/loan/repository/loan.repository';

export class LoanRepositoryImpl implements LoanRepository {
  private db = admin.firestore();

  async createLoan(loan: Loan): Promise<void> {
    await this.db
      .collection('loans')
      .doc(loan.id)
      .set({
        memberCode: loan.memberCode,
        bookCode: loan.bookCode,
        borrowedDate: loan.borrowedDate,
        returned: loan.returned,
        returnDate: loan.returnDate,
        ...(loan.returnDate ? { returnDate: loan.returnDate } : {}),
      });
  }

  async findLoanByBookCode(bookCode: string): Promise<Loan | null> {
    const loanSnapshot = await this.db
      .collection('loans')
      .where('bookCode', '==', bookCode)
      .where('returned', '==', false)
      .limit(1)
      .get();

    if (!loanSnapshot.empty) {
      const doc = loanSnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Loan;
    } else {
      return null;
    }
  }

  async updateLoan(loan: Loan): Promise<void> {
    await this.db.collection('loans').doc(loan.id).update({
      returned: loan.returned,
      returnDate: loan.returnDate,
    });
  }

  async findAll(): Promise<Loan[]> {
    const snapshot = await this.db.collection('loans').get();
    return snapshot.docs.map((doc) => doc.data() as Loan);
  }
}
