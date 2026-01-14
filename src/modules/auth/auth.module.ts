import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AUTH_CLIENT } from '../../config/rmq.clients';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_CLIENT,
        transport: Transport.RMQ as const,
        options: {
          urls: [
            process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672',
          ],
          queue: 'auth_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
