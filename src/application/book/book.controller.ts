import { Controller, Post, Body, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../../domain/book/entity/book';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('add')
  @ApiOperation({ summary: 'Menambahkan buku baru' })
  @ApiResponse({ status: 201, description: 'Buku baru berhasil ditambahkan' })
  @ApiResponse({ status: 400, description: 'Data buku tidak valid' })
  @ApiBody({ type: Book, description: 'Data buku baru' })
  async addBook(@Body() book: Book) {
    const result = await this.bookService.addBook(book);
    return { Response: result };
  }

  @Get('check')
  @ApiOperation({ summary: 'Menampilkan semua buku dan jumlahnya' })
  @ApiResponse({
    status: 200,
    description: 'Daftar semua buku yang tersedia dengan jumlahnya',
    type: [Book],
  })
  async checkBooks() {
    return await this.bookService.checkBooks();
  }
}
