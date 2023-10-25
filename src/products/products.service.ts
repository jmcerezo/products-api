import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const product = await this.databaseService.product.findUnique({
      where: { id },
      include: { reviews: true },
    });

    if (!product) {
      throw new NotFoundException('Product does not exist.');
    }

    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.databaseService.product.update({
        where: { id },
        data: updateProductDto,
        include: { reviews: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Product does not exist.');
      }
    }
  }

  async deleteProduct(id: string) {
    try {
      return await this.databaseService.product.delete({
        where: { id },
        include: { reviews: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Product does not exist.');
      }
    }
  }
}
