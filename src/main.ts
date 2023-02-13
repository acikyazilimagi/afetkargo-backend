import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { dotEnvOptions } from './common/config/dotenv-options';
import { AppModule } from './app.module';
import { morganLogger } from './common/logger/morgan.logger';
import  helmet from 'helmet';
import { ValidationPipe } from './common/pipes/classValidator.pipe';

dotenv.config(dotEnvOptions);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Afet Kargo API Swagger Doc')
    .setDescription('Afet Kargo takibi ve bilgileri')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'x-api-key'})
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { swaggerOptions: { persistAuthorization: true }, customSiteTitle: 'Afet Kargo API Doc'}) 

  app.use(morganLogger);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://api-test.afetkargo.com',
      'https://astonishing-naiad-b9cce7.netlify.app',
      'https://www.afetkargo.com',
      'https://afetkargo.com',
      'https://test.afetkargo.com',
    ],
    methods: ["GET", "POST","PUT","DELETE"],
  });
  app.use(helmet());
  await app.listen(process.env.PORT);
}
bootstrap();
