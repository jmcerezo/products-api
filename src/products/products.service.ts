import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      return await this.databaseService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Product already exists.');
      }
    }
  }

  async getAllProducts() {
    return await this.databaseService.product.findMany({});
  }

  async getOneProduct(id: string) {
    return await this.databaseService.product.findUnique({
      where: { id },
      include: { reviews: true, tags: true },
    });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return await this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async deleteProduct(id: string) {
    return await this.databaseService.product.delete({ where: { id } });
  }
}
