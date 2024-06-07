import { Inject } from '@nestjs/common';
import { Book } from '../../domain/book/entity/book';
import { BookRepository } from '../../domain/book/repository/book.repository';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BookService {
  constructor(
    @Inject('BookRepository')
    private bookRepository: BookRepository,
  ) {}

  async addBook(book: Book): Promise<any> {
    const existingBook = await this.bookRepository.findByCode(book.code);

    if (existingBook) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Buku dengan kode ini sudah ada',
          error: true,
        },
        HttpStatus.CONFLICT,
      );
    }

    await this.bookRepository.save(book);

    return {
      status: HttpStatus.CREATED,
      message: 'Buku berhasil ditambahkan',
      error: false,
    };
  }

  async checkBooks(): Promise<any> {
    const books = await this.bookRepository.findAll();
    // Filter out books that are currently borrowed
    const availableBooks = books.filter((book) => !book.borrowedBy);
    return availableBooks.map((book) => ({
      code: book.code,
      title: book.title,
      author: book.author,
      availableQuantity: book.stock,
    }));
  }
}
