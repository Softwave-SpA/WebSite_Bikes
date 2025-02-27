import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendContactEmail(formData: any) {
    const emailOptions = {
      from: formData.correo,
      to: this.configService.get<string>('EMAIL_USER'),
      subject: `Nuevo coreo de ${formData.nombre}`,
      text: `
        Nombre: ${formData.nombre}
        Teléfono: ${formData.telefono}
        Asunto: ${formData.asunto}
        Comentarios: ${formData.comentarios}
      `,
    };

    return this.transporter.sendMail(emailOptions);
  }

  async sendOrderEmail(orderData: any) {
    const emailOptions = {
      from: orderData.email,
      to: this.configService.get<string>('EMAIL_USER'),
      subject: `Nueva orden de compra de ${orderData.name}`,
      text: `
        Nombre: ${orderData.name}
        Dirección: ${orderData.address}
        Email: ${orderData.email}
        Teléfono: ${orderData.phone}
        Productos:
        ${orderData.cartItems.map((item) => `- ${item.nombre}: Cantidad: ${item.quantity}, Subtotal: $${item.precio}`).join('\n')}
        Total: $${orderData.totalPrice}
      `,
    };

    return this.transporter.sendMail(emailOptions);
  }
}
