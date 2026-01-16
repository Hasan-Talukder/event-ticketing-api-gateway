import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { RMQ_PATTERN, RMQ_SERVICE } from '@event-ticketing/shared';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(RMQ_SERVICE.AUTH) private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() dto: any) {
    return firstValueFrom(
      this.authClient.send(RMQ_PATTERN.REGISTER, dto).pipe(timeout(5000)),
    );
  }

  @Post('login')
  login(@Body() dto: any) {
    return firstValueFrom(
      this.authClient.send(RMQ_PATTERN.LOGIN, dto).pipe(timeout(5000)),
    );
  }

  @Post('validate_token')
  validateToken(@Body() body: { token: string }) {
    return firstValueFrom(
      this.authClient
        .send(RMQ_PATTERN.VALIDATE_TOKEN, body.token)
        .pipe(timeout(5000)),
    );
  }
}
