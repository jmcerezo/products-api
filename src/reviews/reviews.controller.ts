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
import { ReviewResponseDto } from './dto/review-response.dto';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiCreatedResponse({ type: ReviewResponseDto })
  async createProduct(@Body() createProducDto: CreateReviewDto) {
    return await this.reviewsService.createReview(createProducDto);
  }

  @Get()
  @ApiOkResponse({ type: ReviewResponseDto })
  async getAllProducts() {
    return await this.reviewsService.getAllReviews();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewResponseDto })
  async getOneProduct(@Param('id') id: string) {
    return await this.reviewsService.getOneReview(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReviewResponseDto })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.updateReview(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReviewResponseDto })
  async deleteProduct(@Param('id') id: string) {
    return await this.reviewsService.deleteReview(id);
  }
}
