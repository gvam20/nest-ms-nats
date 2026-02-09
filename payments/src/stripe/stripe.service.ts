import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs';
import Stripe from 'stripe';

@Injectable()
export class StripeService {

    private stripe: Stripe;
    constructor(){
        this.stripe = new Stripe(envs.stripe);
    }

    //this expose client to use all methods from stripe
    get client(): Stripe {
        return this.stripe;
    }
}
