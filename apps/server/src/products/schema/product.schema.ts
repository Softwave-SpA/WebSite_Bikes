import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: Object })  // Guardará las características como un objeto JSON
  caracteristicas: Record<string, any>;

  @Prop()
  imagen: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, enum: ['Componentes', 'Mantenimiento', 'Protecciones', 'Bicicletas', 'Ropa y Calzado', 'Herramientas', 'Otros'] })
  categoria: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
