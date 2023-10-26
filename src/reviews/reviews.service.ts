import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createReview(createReviewDto: CreateReviewDto) {
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

  async getAllReviews() {
    return await this.databaseService.review.findMany({});
  }

  async getOneReview(id: string) {
    const review = await this.databaseService.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review does not exist.');
    }

    return review;
  }

  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
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

  async deleteReview(id: string) {
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
