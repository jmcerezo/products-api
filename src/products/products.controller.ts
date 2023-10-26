import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductReviewsDto } from './dto/product-reviews.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from '@prisma/client';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductDto })
  @ApiBadRequestResponse({ description: 'Error: Bad Request' })
  async createProduct(
    @Body() createProducDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProducDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductDto, isArray: true })
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductReviewsDto })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async getOneProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Product> {
    return await this.productsService.getOneProduct(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ProductReviewsDto })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductReviewsDto })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async deleteProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Product> {
    return await this.productsService.deleteProduct(id);
  }
}
