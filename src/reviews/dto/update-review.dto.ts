import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto implements Prisma.ReviewUncheckedUpdateInput {
  @ApiProperty({ example: 'Disappointed' })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'The quality is really bad.' })
  @IsOptional()
  @IsString()
  readonly content: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;
}
