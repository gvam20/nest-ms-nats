import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE, envs } from 'src/config';
import { NatsModule } from 'src/transport/nats.module';
import { TcpModule } from 'src/transport/tcp.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [NatsModule, TcpModule]
})
export class OrdersModule {}
