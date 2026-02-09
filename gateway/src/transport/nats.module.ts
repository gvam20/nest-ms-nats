import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, SERVICE_NATS } from 'src/config';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: SERVICE_NATS,
                transport: Transport.NATS,
                options: {
                    servers: envs.natsServer,
                },
            },
        ]),
    ],
    exports: [
        ClientsModule.register([
            {
                name: SERVICE_NATS,
                transport: Transport.NATS,
                options: {
                    servers: envs.natsServer,
                },
            },
        ]),
    ],
})
export class NatsModule { }
