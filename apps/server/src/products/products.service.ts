import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GridFSBucket, ObjectId } from 'mongodb';

@Injectable()
export class ProductsService {
  private readonly bucketName = 'productsMedia';
  
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(
    createProductDto: CreateProductDto, 
    files: Express.Multer.File[]
  ): Promise<Product> {
    // Subir archivos a GridFS y obtener sus IDs
    const fileIds = await Promise.all(files.map((file) => this.uploadFile(file)));

    // Crear el producto con referencias a los archivos
    const productWithMedia = {
      ...createProductDto,
      multimedia: fileIds,
    };
    const createdProduct = new this.productModel(productWithMedia);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  // Subir un archivo a GridFS
  private async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = new GridFSBucket(this.connection.db, {
      bucketName: this.bucketName,
    });

    return new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });

      uploadStream.end(file.buffer);

      uploadStream.on('finish', () => {
        resolve(uploadStream.id.toString());
      });

      uploadStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  // Descargar un archivo de GridFS
  async downloadFile(fileId: string): Promise<Buffer> {
    const bucket = new GridFSBucket(this.connection.db, {
      bucketName: this.bucketName,
    });

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));

      downloadStream.on('data', (chunk) => chunks.push(chunk));
      downloadStream.on('end', () => resolve(Buffer.concat(chunks)));
      downloadStream.on('error', (err) => reject(err));
    });
  }
}
