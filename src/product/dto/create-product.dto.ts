import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto implements Prisma.ProductCreateInput {
  @ApiProperty({ example: 'ALL CONFERENCE INDOOR-OUTDOOR BASKETBALL' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Ball' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 49.99 })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  readonly sale: boolean;

  @ApiProperty({
    type: () => $Enums.Availability,
    enum: $Enums.Availability,
    example: $Enums.Availability.IN_STORE,
  })
  @IsNotEmpty()
  @IsEnum($Enums.Availability)
  readonly availability: $Enums.Availability;
}
