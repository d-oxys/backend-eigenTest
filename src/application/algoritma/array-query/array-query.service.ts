import { Injectable } from '@nestjs/common';

@Injectable()
export class ArrayQueryService {
  countOccurrences(inputArray: string[], queryArray: string[]): number[] {
    return queryArray.map(
      (query) => inputArray.filter((item) => item === query).length,
    );
  }
}
