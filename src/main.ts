import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('NestJS REST API using Prisma with PostgreSQL')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [ProductModule, ReviewModule],
  });
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Products API - Swagger UI',
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(port);
}
bootstrap();
