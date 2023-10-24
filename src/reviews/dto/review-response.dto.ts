import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';

export class ReviewResponseDto implements Review {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly productId: string;
}
