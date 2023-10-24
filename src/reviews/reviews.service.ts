import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createReview(createReviewDto: CreateReviewDto) {
    return await this.databaseService.review.create({
      data: createReviewDto,
    });
  }

  async getAllReviews() {
    return await this.databaseService.review.findMany({});
  }

  async getOneReview(id: string) {
    return await this.databaseService.review.findUnique({
      where: { id },
    });
  }

  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    return await this.databaseService.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async deleteReview(id: string) {
    return await this.databaseService.review.delete({ where: { id } });
  }
}
