import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Images } from './interfaces/images.interface';
import { ImagesDto } from './dto/images-dto';

@Injectable()
export class ImagesService {
  
  constructor( @InjectModel('Images') private imagesModel: Model<Images>) {}

  async uploadFile(filename: ImagesDto) {
    const file = new this.imagesModel(filename);
    return await file.save();
  }
}
