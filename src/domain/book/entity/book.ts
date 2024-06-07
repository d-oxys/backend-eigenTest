export class Book {
  code: string;
  title: string;
  author: string;
  stock: number;
  borrowedBy?: string;
  borrowedDate?: Date;
}
