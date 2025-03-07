import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/server');
  
  app.enableCors({
    origin: [ 
      'http://200.35.159.55',
      'http://sprintpits.cl',
      'http://www.sprintpits.cl'
    ],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
