import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVER } from 'src/config';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: NATS_SERVER,
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
                name: NATS_SERVER,
                transport: Transport.NATS,
                options: {
                    servers: envs.natsServer,
                },
            },
        ]),
    ],
})
export class NatsModule { }
