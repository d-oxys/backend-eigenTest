import { Injectable } from '@nestjs/common';

@Injectable()
export class ReverseService {
  reverseString(input: string): string {
    const letters = input.match(/[A-Za-z]+/g)?.[0] || '';
    const numbers = input.match(/\d+/g)?.[0] || '';
    const reversedLetters = [...letters].reverse().join('');
    return `${reversedLetters}${numbers}`;
  }
}
