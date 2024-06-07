import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepositoryImpl } from '../../infrastructure/book/book.repository.impl';

@Module({
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: 'BookRepository',
      useClass: BookRepositoryImpl,
    },
  ],
})
export class BookModule {}
