import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';
import { ValidationExceptionFilter } from './common/exceptions/validation-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global validation pipe
  app.useGlobalPipes(new GlobalValidationPipe());
  
  // Global exception filter
  app.useGlobalFilters(new ValidationExceptionFilter());

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Analytics API')
    .setDescription('Secure Analytics API with comprehensive validation')
    .setVersion('1.0')
    .addTag('analytics')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Security headers
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
