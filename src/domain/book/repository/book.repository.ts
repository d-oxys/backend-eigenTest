import { Book } from '../entity/book';

export interface BookRepository {
  findByCode(code: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  save(book: Book): Promise<void>;
}
