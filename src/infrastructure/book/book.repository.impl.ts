import * as admin from 'firebase-admin';
import { Book } from '../../domain/book/entity/book';
import { BookRepository } from '../../domain/book/repository/book.repository';

export class BookRepositoryImpl implements BookRepository {
  private db = admin.firestore();

  async findByCode(code: string): Promise<Book | null> {
    const doc = await this.db.collection('books').doc(code).get();
    return doc.exists ? (doc.data() as Book) : null;
  }

  async save(book: Book): Promise<void> {
    await this.db.collection('books').doc(book.code).set(book);
  }
  async findAll(): Promise<Book[]> {
    const snapshot = await this.db.collection('books').get();
    return snapshot.docs.map((doc) => doc.data() as Book);
  }
}
