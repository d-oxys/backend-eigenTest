export class Member {
  code: string;
  name: string;
  borrowedBooks: string[] = [];
  penaltyUntil?: Date;
}
