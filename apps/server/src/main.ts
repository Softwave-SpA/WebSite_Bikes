import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/server');
  
  // Lista de IPs de Cloudflare (IPv4)
  const cloudflareIps = [
    '173.245.48.0/20',
    '103.21.244.0/22',
    '103.22.200.0/22',
    '103.31.4.0/22',
    '141.101.64.0/18',
    '108.162.192.0/18',
    '190.93.240.0/20',
    '188.114.96.0/20',
    '197.234.240.0/22',
    '198.41.128.0/17',
    '162.158.0.0/15',
    '104.16.0.0/13',
    '104.24.0.0/14',
    '172.64.0.0/13',
    '131.0.72.0/22',
  ];

  app.enableCors({
    origin: [ 
      'http://200.35.159.55',
      'http://sprintpits.cl',
      'http://www.sprintpits.cl',
      'https://sprintpits.cl',
      'https://www.sprintpits.cl',
      'http://localhost:5173',
      ...cloudflareIps, // Agrega las IPs de Cloudflare
    ],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();