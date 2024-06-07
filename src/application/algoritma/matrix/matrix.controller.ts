import { Controller, Get } from '@nestjs/common';
import { MatrixService } from './matrix.service';

@Controller('algoritma')
export class MatrixController {
  constructor(private readonly matrixService: MatrixService) {}

  @Get('matrix')
  getDiagonalDifference(): number {
    const matrix = [
      [1, 2, 0],
      [4, 5, 6],
      [7, 8, 9],
    ];
    return this.matrixService.calculateDiagonalDifference(matrix);
  }
}
