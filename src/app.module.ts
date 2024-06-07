import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './application/member/member.module';
import { BookModule } from './application/book/book.module';
import { AlgoritmaModule } from './application/algoritma/algoritma.module';

@Module({
  imports: [MemberModule, BookModule, AlgoritmaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
