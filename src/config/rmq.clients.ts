import { Transport } from '@nestjs/microservices';

export const AUTH_CLIENT = 'AUTH_CLIENT';

// Use 'as const' to make TypeScript infer Transport.RMQ as a literal [web:55]
export const authClientConfig = {
  name: AUTH_CLIENT,
  transport: Transport.RMQ as const,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'],
    queue: 'auth_queue',
    queueOptions: { durable: true },
  },
};
