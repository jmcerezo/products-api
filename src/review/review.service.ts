import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const product = await this.databaseService.product.findUnique({
      where: { id: createReviewDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product does not exist.');
    }

    return await this.databaseService.review.create({
      data: createReviewDto,
    });
  }

  async getAllReviews(): Promise<Review[]> {
    return await this.databaseService.review.findMany({});
  }

  async getOneReview(id: string): Promise<Review> {
    const review = await this.databaseService.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review does not exist.');
    }

    return review;
  }

  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    try {
      return await this.databaseService.review.update({
        where: { id },
        data: updateReviewDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Review does not exist.');
      }
    }
  }

  async deleteReview(id: string): Promise<Review> {
    try {
      return await this.databaseService.review.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Review does not exist.');
      }
    }
  }
}
