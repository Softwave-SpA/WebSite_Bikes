import { Controller, Post, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/images.helper';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload',
      filename: renameImage
    }),
    fileFilter: fileFilter
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,  
    @Res() res: Response
  ) {
    await this.imagesService.uploadFile({ filename: file.filename });

    return res.status(HttpStatus.OK).json({
      message: 'Saved Image...',
      fileName: file.filename
    })
  }
}
