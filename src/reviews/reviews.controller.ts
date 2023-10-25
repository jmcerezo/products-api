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
  async createProduct(@Body() createProducDto: CreateReviewDto) {
    return await this.reviewsService.createReview(createProducDto);
  }

  @Get()
  @ApiOkResponse({ type: ReviewDto })
  async getAllProducts() {
    return await this.reviewsService.getAllReviews();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewDto })
  async getOneProduct(@Param('id') id: string) {
    return await this.reviewsService.getOneReview(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReviewDto })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.updateReview(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReviewDto })
  async deleteProduct(@Param('id') id: string) {
    return await this.reviewsService.deleteReview(id);
  }
}
