export class CreateProductDto {
    readonly nombre: string;
    readonly precio: number;
    readonly descripcion: string;
    readonly caracteristicas: Record<string, any>; // Guardará las características como clave-valor
    readonly imagen: string;
    readonly stock: number;
  }
  