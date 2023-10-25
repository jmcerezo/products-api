import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateReviewDto implements Prisma.ReviewUncheckedCreateInput {
  @ApiProperty({ example: 'Great Product' })
  readonly title: string;

  @ApiProperty({ example: 'The quality is superb.' })
  readonly content: string;

  @ApiProperty({ example: 5 })
  readonly rating: number;

  @ApiProperty({ example: '69e9d7a0-6ecf-445d-ae00-854c67623d3f' })
  readonly productId: string;
}
