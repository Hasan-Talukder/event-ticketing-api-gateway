import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <--- Import these
import { AuthController } from './auth.controller';
import { AUTH_CLIENT } from '../../config/rmq.clients';

@Module({
  imports: [
    ClientsModule.registerAsync([
      // <--- Changed from register() to registerAsync()
      {
        name: AUTH_CLIENT,
        imports: [ConfigModule], // <--- Import ConfigModule context
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            // Now we use configService to get the variable safely
            urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
            queue: 'auth_queue',
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService], // <--- Inject the service
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
