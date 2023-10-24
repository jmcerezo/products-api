import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';

export class UpdateProductDto {
  @ApiProperty({ example: 'ALL CONFERENCE INDOOR-OUTDOOR BASKETBALL' })
  readonly name: string;

  @ApiProperty({ example: 'Ball' })
  readonly description: string;

  @ApiProperty({ example: 29.99 })
  readonly price: number;

  @ApiProperty({ example: true })
  readonly sale: boolean;

  @ApiProperty({
    type: () => $Enums.Availability,
    enum: $Enums.Availability,
    example: $Enums.Availability.ONLINE,
  })
  readonly availability: $Enums.Availability;

  @ApiProperty({
    example: {
      create: [
        { content: 'Basketball Equipment' },
        { content: 'Sports Equipment' },
      ],
    },
  })
  readonly tags: Prisma.TagCreateNestedManyWithoutProductsInput;
}
