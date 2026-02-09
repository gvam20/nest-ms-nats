import { Injectable, Logger } from '@nestjs/common';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { StripeService } from '../stripe/stripe.service';
import { Request, Response } from 'express';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

  constructor(private readonly stripeService: StripeService) { }

  async createPaymentSession(data: PaymentSessionDto) {
    const { currency, items, orderId } = data;
    const order = await this.stripeService.client.checkout.sessions.create({
      payment_intent_data: {
        metadata: {
          id_order: orderId,
        }
      },
      line_items: items.map(item => ({
        price_data: {
          currency : currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3003/api/payment/success',
      cancel_url: 'http://localhost:3003/api/payment/cancel',
    })

    return order;
  }

  async stripeWebhook(request: Request, response: Response) {

    let event : Stripe.Event
    const endpoint = 'whsec_f844U5Ahhzlleps4wUG1CwjFzONSv21h';
    const signature: any = request.headers['stripe-signature'];
console.log(signature);
    try {
      event = this.stripeService.client.webhooks.constructEvent(
        request['rawBody'],
        signature,
        endpoint
      )
      console.log('event-------------------->', event);
    } catch (error) {
      console.log(error);
      return response.status(400).send(`webhook error ${error.message}`)
    }

    switch( event.type ) {
      case 'charge.succeeded':
      break;

      default:
        console.log('not implemented');
      break;

    }
    return response.status(200).json({ signature })
  }

}
