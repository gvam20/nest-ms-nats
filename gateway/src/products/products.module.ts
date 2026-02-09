import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
//import { ClientsModule, Transport } from '@nestjs/microservices';
//import { PRODUCT_SERVICE, PRODUCT_SERVICE_NATS, envs } from 'src/config';
import { TcpModule } from 'src/transport/tcp.module';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [ TcpModule, NatsModule]
})
export class ProductsModule {}
