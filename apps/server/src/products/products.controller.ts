import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('imagen', {
  //     storage: diskStorage({
  //       destination: './uploads', // Donde guardarás las imágenes
  //       filename: (req, file, cb) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         cb(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  //   }),
  // )
  // async create(
  //   @Body() createProductDto: CreateProductDto,
  //   @UploadedFile() imagen: Express.Multer.File,
  // ) {
  //   // Agregar la ruta de la imagen al DTO
  //   const productWithImage = {
  //     ...createProductDto,
  //     imagen: imagen ? imagen.filename : null,
  //   };

  //   return this.productsService.create(productWithImage);
  // }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10)) // Permite cargar hasta 10 archivos
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Crea el producto y sube los archivos multimedia
    return this.productsService.create(createProductDto, files);
  }

  // Obtener todos los productos
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Obtener un producto por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // Actualizar un producto
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  // Eliminar un producto
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
  
  // Descargar un archivo multimedia desde GridFS
  @Get('download/:fileId')
  async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const file = await this.productsService.downloadFile(fileId);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(file);
  }

}
