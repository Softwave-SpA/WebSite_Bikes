import { Controller, Post, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('contact')
  async submitContactForm(@Body() formData: any) {
    await this.emailService.sendContactEmail(formData);
    return { message: 'Correo de contacto enviado exitosamente' };
  }

  @Post('order')
  async submitOrder(@Body() orderData: any) {
    await this.emailService.sendOrderEmail(orderData);
    return { message: 'Orden de compra enviada exitosamente' };
  }
}
