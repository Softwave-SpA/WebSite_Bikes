import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EmailService } from './email.service';
import axios from 'axios';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('contact')
  async submitContactForm(@Body() formData: any) {
    console.log(formData.captcha);
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.KEY_CAPTCHA}&response=${formData.captcha}`
    );
  
    if (!response.data.success) {
      throw new BadRequestException('reCAPTCHA no válido');
    }
    
    await this.emailService.sendContactEmail(formData);
    return { message: 'Correo de contacto enviado exitosamente' };
  }

  @Post('order')
  async submitOrder(@Body() orderData: any) {
    console.log(orderData.captcha);
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.KEY_CAPTCHA}&response=${orderData.captcha}`
    );
  
    if (!response.data.success) {
      throw new BadRequestException('reCAPTCHA no válido');
    }
    
    await this.emailService.sendOrderEmail(orderData);
    return { message: 'Orden de compra enviada exitosamente' };
  }

  @Post('service-order')
  async submitServiceOrder(@Body() serviceOrderData: any) {
    console.log(serviceOrderData.captcha);
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.KEY_CAPTCHA}&response=${serviceOrderData.captcha}`
    );
  
    if (!response.data.success) {
      throw new BadRequestException('reCAPTCHA no válido');
    }
    
    await this.emailService.sendServiceOrderEmail(serviceOrderData);
    return { message: 'Orden de servicio enviada exitosamente' };
  }
}
