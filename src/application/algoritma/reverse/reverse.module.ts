import { Module } from '@nestjs/common';
import { ReverseService } from './reverse.service';
import { ReverseController } from './reverse.controller';

@Module({
  controllers: [ReverseController],
  providers: [ReverseService],
})
export class ReverseModule {}
