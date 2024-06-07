import { Controller, Get } from '@nestjs/common';
import { LongestWordService } from './longest-word.service';

@Controller('algoritma')
export class LongestWordController {
  constructor(private readonly longestWordService: LongestWordService) {}

  @Get('longest-word')
  getLongestWord(): string {
    const sentence = 'Saya sangat senang mengerjakan soal algoritma';
    const { word, length } = this.longestWordService.findLongestWord(sentence);
    return `${word}: ${length} character`;
  }
}
