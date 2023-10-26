import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async getOneReview(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.reviewsService.getOneReview(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReviewDto })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async updateReview(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReviewDto })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async deleteReview(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.reviewsService.deleteReview(id);
  }
}
