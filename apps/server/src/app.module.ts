import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    EmailModule,
    ProductsModule,    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    // Sirve el frontend en /app
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/dist'),
      serveRoot: '/app', // Sirve el frontend en esta ruta
    }),
    // // Sirve las imágenes en /uploads
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', 'server/uploads'),
    //   serveRoot: '/uploads',  // Ruta para acceder a las imágenes
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

