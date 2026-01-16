import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQ_QUEUE, RMQ_SERVICE } from '@event-ticketing/shared';

// (optional) backward-compat for old imports
export const AUTH_CLIENT = RMQ_SERVICE.AUTH;

export const RmqClientsModule = ClientsModule.registerAsync([
  {
    name: RMQ_SERVICE.AUTH,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: [config.getOrThrow<string>('RABBITMQ_URL')],
        queue: RMQ_QUEUE.AUTH,
        queueOptions: { durable: true },
      },
    }),
  },
]);
