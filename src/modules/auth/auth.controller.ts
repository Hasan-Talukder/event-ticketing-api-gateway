import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_CLIENT } from 'src/config/rmq.clients';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  @Post('register')
  register(@Body() dto: any) {
    return firstValueFrom(this.authClient.send({ cmd: 'auth.register' }, dto));
  }

  @Post('login')
  login(@Body() dto: any) {
    return firstValueFrom(this.authClient.send({ cmd: 'auth.login' }, dto));
  }

  @Post('validate_token')
  validateToken(@Body() body: { token: string }) {
    return firstValueFrom(
      this.authClient.send({ cmd: 'auth.validate_token' }, body.token),
    );
  }
}
