import { Injectable } from '@nestjs/common';

@Injectable()
export class LongestWordService {
  findLongestWord(sentence: string): { word: string; length: number } {
    let longestWord = '';
    const words = sentence.split(' ');

    words.forEach((word) => {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    });

    return { word: longestWord, length: longestWord.length };
  }
}
