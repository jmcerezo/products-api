import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto implements Prisma.ProductUpdateInput {
  @ApiProperty({ example: 'ALL CONFERENCE INDOOR-OUTDOOR BASKETBALL' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Ball' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 29.99 })
  @IsOptional()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  readonly sale: boolean;

  @ApiProperty({
    type: () => $Enums.Availability,
    enum: $Enums.Availability,
    example: $Enums.Availability.ONLINE,
  })
  @IsOptional()
  @IsEnum($Enums.Availability)
  readonly availability: $Enums.Availability;
}
