export class Loan {
  id: string;
  memberCode: string;
  bookCode: string;
  borrowedDate: Date;
  returned: boolean;
  returnDate?: Date;
}
