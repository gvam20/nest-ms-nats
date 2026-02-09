import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import type { Request, Response } from 'express';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() data : PaymentSessionDto) {
    return this.paymentService.createPaymentSession(data);
  }

  @Get('success')
  success() {
    return 'success';
    //return this.paymentService.findAll();
  }

  @Get('cancel')
  cancel() {
    return 'cancel';
    //return this.paymentService.findOne(+id);
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentService.stripeWebhook(req, res);
  }
}
