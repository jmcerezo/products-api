import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';

export class CreateProductDto implements Prisma.ProductCreateInput {
  @ApiProperty({ example: 'ALL CONFERENCE INDOOR-OUTDOOR BASKETBALL' })
  readonly name: string;

  @ApiProperty({ example: 'Ball' })
  readonly description: string;

  @ApiProperty({ example: 49.99 })
  readonly price: number;

  @ApiProperty({ example: false })
  readonly sale: boolean;

  @ApiProperty({
    type: () => $Enums.Availability,
    enum: $Enums.Availability,
    example: $Enums.Availability.IN_STORE,
  })
  readonly availability: $Enums.Availability;
}
