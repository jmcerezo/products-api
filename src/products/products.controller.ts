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
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsEntity } from './entities/products.entity';
import { Product } from '@prisma/client';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductsEntity })
  @ApiConflictResponse({ description: 'Error: Conflict' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductsEntity, isArray: true })
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async getOneProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Product> {
    return await this.productsService.getOneProduct(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async deleteProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Product> {
    return await this.productsService.deleteProduct(id);
  }
}
