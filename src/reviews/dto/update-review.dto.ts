import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UpdateReviewDto implements Prisma.ReviewUncheckedUpdateInput {
  @ApiProperty({ example: 'Disappointed' })
  readonly title: string;

  @ApiProperty({ example: 'The quality is really bad.' })
  readonly content: string;

  @ApiProperty({ example: 1 })
  readonly rating: number;
}
