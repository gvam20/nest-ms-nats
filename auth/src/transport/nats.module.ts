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
                    servers: envs.nats,
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
                    servers: envs.nats,
                },
            },
        ]), 
    ],
})
export class NatsModule { }
