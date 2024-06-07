import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Book } from '../../domain/book/entity/book';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockBookRepository = {
  findByCode: jest.fn(),
  save: jest.fn(),
  findAll: jest.fn(),
};

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: 'BookRepository',
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addBook', () => {
    it('should throw a conflict exception if book already exists', async () => {
      const book = new Book();
      book.code = 'TESTCODE';
      mockBookRepository.findByCode.mockResolvedValueOnce(book);

      await expect(service.addBook(book)).rejects.toThrow(HttpException);
    });

    it('should successfully add a book if it does not exist', async () => {
      const book = new Book();
      book.code = 'TESTCODE';
      mockBookRepository.findByCode.mockResolvedValueOnce(null);
      mockBookRepository.save.mockResolvedValueOnce(undefined);

      const result = await service.addBook(book);
      expect(result.status).toBe(HttpStatus.CREATED);
      expect(result.message).toBe('Buku berhasil ditambahkan');
    });
  });
  it('should return all available books', async () => {
    const books: Book[] = [
      {
        code: 'BK001',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        stock: 5,
        borrowedBy: null,
      },
      {
        code: 'BK002',
        title: '1984',
        author: 'George Orwell',
        stock: 3,
        borrowedBy: null,
      },
      {
        code: 'BK003',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        stock: 4,
        borrowedBy: null,
      },
    ];
    mockBookRepository.findAll.mockResolvedValue(books);

    const result = await service.checkBooks();
    const expectedOutput = books.map((book) => ({
      code: book.code,
      title: book.title,
      author: book.author,
      availableQuantity: book.stock,
    }));

    expect(result).toEqual(expectedOutput);
  });
});
