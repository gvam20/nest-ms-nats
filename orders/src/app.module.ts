import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transport/nats.module';
import { TcpModule } from './transport/tcp.module';


@Module({
  imports: [OrdersModule, NatsModule, TcpModule],

})
export class AppModule {}
