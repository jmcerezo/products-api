import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Product already exists.');
      }
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOneProduct(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { reviews: true },
    });

    if (!product) {
      throw new NotFoundException('Product does not exist.');
    }

    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.prisma.product.update({
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

  async deleteProduct(id: string): Promise<Product> {
    try {
      return await this.prisma.product.delete({
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
