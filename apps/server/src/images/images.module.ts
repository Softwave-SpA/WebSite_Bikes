import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesSchemas } from './schema/images.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Images', schema: ImagesSchemas }]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
