import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from '../../domain/book/entity/book';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockBookService = {
  addBook: jest.fn(),
};

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addBook', () => {
    it('should return the book addition result', async () => {
      const book = new Book();
      const response = {
        status: HttpStatus.CREATED,
        message: 'Buku baru berhasil ditambahkan',
        error: false,
      };
      mockBookService.addBook.mockResolvedValue(response);

      expect(await controller.addBook(book)).toEqual({ Response: response });
    });

    it('should throw an error if the book data is not valid', async () => {
      const book = new Book();
      mockBookService.addBook.mockRejectedValue(
        new HttpException('Data buku tidak valid', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.addBook(book)).rejects.toThrow(HttpException);
    });
  });
});
