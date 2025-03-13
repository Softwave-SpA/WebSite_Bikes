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
    // Correo al cliente
    const emailToClient = {
      from: formData.correo,
      to: this.configService.get<string>('EMAIL_USER'),
      subject: `Nuevo correo de ${formData.nombre}`,
      text: `
        Nombre: ${formData.nombre}
        Teléfono: ${formData.telefono}
        Asunto: ${formData.asunto}
        Comentarios: ${formData.comentarios}
      `,
    };

    // Correo de confirmación al usuario
    const emailToUser = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: formData.correo,
      subject: `Confirmación de contacto - ${formData.nombre}`,
      text: `
        Hola ${formData.nombre},

        Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.

        Detalles de tu mensaje:
        - Nombre: ${formData.nombre}
        - Teléfono: ${formData.telefono}
        - Asunto: ${formData.asunto}
        - Comentarios: ${formData.comentarios}

        Saludos,
        El equipo de Sprint Pits
      `,
    };

    await this.transporter.sendMail(emailToClient);
    return this.transporter.sendMail(emailToUser);
  }

  async sendOrderEmail(orderData: any) {
    // Correo al cliente
    const emailToClient = {
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

    // Correo de confirmación al usuario
    const emailToUser = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: orderData.email,
      subject: `Confirmación de orden de compra - ${orderData.name}`,
      text: `
        Hola ${orderData.name},

        Gracias por tu compra. Hemos recibido tu orden y la estamos procesando.

        Detalles de tu orden:
        - Productos:
        ${orderData.cartItems.map((item) => `- ${item.nombre}: Cantidad: ${item.quantity}, Subtotal: $${item.precio}`).join('\n')}
        - Total: $${orderData.totalPrice}

        Saludos,
        El equipo de Sprint Pits
      `,
    };

    await this.transporter.sendMail(emailToClient);
    return this.transporter.sendMail(emailToUser);
  }

  async sendServiceOrderEmail(serviceOrderData: any) {
    // Correo al cliente
    const emailToClient = {
      from: serviceOrderData.email,
      to: this.configService.get<string>('EMAIL_USER'),
      subject: `Nueva orden de servicio de ${serviceOrderData.name}`,
      text: `
        Nombre: ${serviceOrderData.name}
        Dirección: ${serviceOrderData.address}
        Email: ${serviceOrderData.email}
        Teléfono: ${serviceOrderData.phone}
        Servicio: ${serviceOrderData.service}
        Comentarios: ${serviceOrderData.comments || 'No hay comentarios adicionales.'}
        Total: $${serviceOrderData.totalPrice}
      `,
    };

    // Correo de confirmación al usuario
    const emailToUser = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: serviceOrderData.email,
      subject: `Confirmación de orden de servicio - ${serviceOrderData.name}`,
      text: `
        Hola ${serviceOrderData.name},

        Gracias por solicitar nuestro servicio. Hemos recibido tu orden y la estamos procesando.

        Detalles de tu orden:
        - Servicio: ${serviceOrderData.service}
        - Comentarios: ${serviceOrderData.comments || 'No hay comentarios adicionales.'}
        - Total: $${serviceOrderData.totalPrice}

        Saludos,
        El equipo de Sprint Pits
      `,
    };

    await this.transporter.sendMail(emailToClient);
    return this.transporter.sendMail(emailToUser);
  }
}