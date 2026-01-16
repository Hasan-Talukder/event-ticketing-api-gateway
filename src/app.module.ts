import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqClientsModule } from './config/rmq.clients';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RmqClientsModule],
  controllers: [AuthController],
})
export class AppModule {}
