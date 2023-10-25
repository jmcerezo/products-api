import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewDto } from './dto/review.dto';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiCreatedResponse({ type: ReviewDto })
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewsService.createReview(createReviewDto);
  }

  @Get()
  @ApiOkResponse({ type: ReviewDto })
  async getAllReviews() {
    return await this.reviewsService.getAllReviews();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewDto })
  async getOneReview(@Param('id') id: string) {
    return await this.reviewsService.getOneReview(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReviewDto })
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReviewDto })
  async deleteReview(@Param('id') id: string) {
    return await this.reviewsService.deleteReview(id);
  }
}
