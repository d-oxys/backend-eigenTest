import { Module } from '@nestjs/common';
import { ReverseModule } from './reverse/reverse.module';
import { LongestWordModule } from './longest-word/longest-word.module';
import { ArrayQueryModule } from './array-query/array-query.module';
import { MatrixModule } from './matrix/matrix.module';

@Module({
  imports: [ReverseModule, LongestWordModule, ArrayQueryModule, MatrixModule],
})
export class AlgoritmaModule {}
