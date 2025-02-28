import { Controller, Post, Body } from '@nestjs/common';
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

  @Post('service-order')
  async submitServiceOrder(@Body() serviceOrderData: any) {
    await this.emailService.sendServiceOrderEmail(serviceOrderData);
    return { message: 'Orden de servicio enviada exitosamente' };
  }
}
