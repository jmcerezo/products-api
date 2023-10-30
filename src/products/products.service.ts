import {
  BadRequestException,
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
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Product already exists.');
      }
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.prismaService.product.findMany({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOneProduct(id: string): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
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
      return await this.prismaService.product.update({
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
      return await this.prismaService.product.delete({
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
