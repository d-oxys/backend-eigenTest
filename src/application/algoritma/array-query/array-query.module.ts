import { Module } from '@nestjs/common';
import { ArrayQueryController } from './array-query.controller';
import { ArrayQueryService } from './array-query.service';

@Module({
  controllers: [ArrayQueryController],
  providers: [ArrayQueryService],
})
export class ArrayQueryModule {}
