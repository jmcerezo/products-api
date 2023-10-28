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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsEntity } from './entities/products.entity';
import { Product } from '@prisma/client';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductsEntity })
  @ApiBadRequestResponse({ description: 'Error: Bad Request' })
  async createProduct(
    @Body() createProducDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProducDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductsEntity, isArray: true })
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async getOneProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Product> {
    return await this.productService.getOneProduct(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async deleteProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Product> {
    return await this.productService.deleteProduct(id);
  }
}
