import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';

export class ReviewEntity implements Review {
  @ApiProperty({ example: '05ffabdb-58fa-4a73-8a05-7f5b80ecc0ab' })
  readonly id: string;

  @ApiProperty({ example: 'Great Product' })
  readonly title: string;

  @ApiProperty({ example: 'The quality is superb.' })
  readonly content: string;

  @ApiProperty({ example: 5 })
  readonly rating: number;

  @ApiProperty({ example: '69e9d7a0-6ecf-445d-ae00-854c67623d3f' })
  readonly productId: string;
}
