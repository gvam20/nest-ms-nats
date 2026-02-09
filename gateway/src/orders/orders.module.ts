import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE, envs } from 'src/config';
import { NatsModule } from 'src/transport/nats.module';
import { TcpModule } from 'src/transport/tcp.module';

@Module({
  controllers: [OrdersController],
  imports: [ TcpModule, NatsModule]

})
export class OrdersModule {}
