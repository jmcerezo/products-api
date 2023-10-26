import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('NestJS REST API using Prisma with PostgreSQL')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [ProductsModule, ReviewsModule],
  });
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Products API - Swagger UI',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
