import { Controller, Get } from '@nestjs/common';
import { ReverseService } from './reverse.service';

@Controller('algoritma')
export class ReverseController {
  constructor(private readonly reverseService: ReverseService) {}

  @Get('reverse')
  getReversedString(): string {
    const input = 'NEGIE1';
    return this.reverseService.reverseString(input);
  }
}
