import { Module } from '@nestjs/common';
import { LongestWordService } from './longest-word.service';
import { LongestWordController } from './longest-word.controller';

@Module({
  controllers: [LongestWordController],
  providers: [LongestWordService],
})
export class LongestWordModule {}
