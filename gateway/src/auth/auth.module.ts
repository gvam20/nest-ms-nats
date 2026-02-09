import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TcpModule } from 'src/transport/tcp.module';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [ TcpModule, NatsModule]

})
export class AuthModule {}
