import { Controller, Get } from '@nestjs/common';
import { ArrayQueryService } from './array-query.service';

@Controller('algoritma')
export class ArrayQueryController {
  constructor(private readonly arrayQueryService: ArrayQueryService) {}

  @Get('array-query')
  getOccurrencesCount(): number[] {
    const input = ['xc', 'dz', 'bbb', 'dz'];
    const query = ['bbb', 'ac', 'dz'];
    return this.arrayQueryService.countOccurrences(input, query);
  }
}
