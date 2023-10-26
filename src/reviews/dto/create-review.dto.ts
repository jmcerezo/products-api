import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto implements Prisma.ReviewUncheckedCreateInput {
  @ApiProperty({ example: 'Great Product' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'The quality is superb.' })
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @ApiProperty({ example: '69e9d7a0-6ecf-445d-ae00-854c67623d3f' })
  @IsNotEmpty()
  @IsUUID()
  readonly productId: string;
}
