import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EmailService } from './email.service';
import axios from 'axios';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('contact')
  async submitContactForm(@Body() formData: any, captcha: string) {
    console.log(captcha);
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.KEY_CAPTCHA}&response=${captcha}`
    );
  
    if (!response.data.success) {
      throw new BadRequestException('reCAPTCHA no válido');
    }
    
    await this.emailService.sendContactEmail(formData);
    return { message: 'Correo de contacto enviado exitosamente' };
  }

  @Post('order')
  async submitOrder(@Body() orderData: any, captcha: string) {
    console.log(captcha);
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.KEY_CAPTCHA}&response=${captcha}`
    );
  
    if (!response.data.success) {
      throw new BadRequestException('reCAPTCHA no válido');
    }
    
    await this.emailService.sendOrderEmail(orderData);
    return { message: 'Orden de compra enviada exitosamente' };
  }

  @Post('service-order')
  async submitServiceOrder(@Body() serviceOrderData: any, captcha: string) {
    console.log(captcha);
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.KEY_CAPTCHA}&response=${captcha}`
    );
  
    if (!response.data.success) {
      throw new BadRequestException('reCAPTCHA no válido');
    }
    
    await this.emailService.sendServiceOrderEmail(serviceOrderData);
    return { message: 'Orden de servicio enviada exitosamente' };
  }
}
