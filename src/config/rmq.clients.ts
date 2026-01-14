import { Transport } from '@nestjs/microservices';
import 'dotenv/config';

export const AUTH_CLIENT = 'AUTH_CLIENT';

// Make it always a string (fallback or throw) [web:55]
const RABBITMQ_URL = process.env.RABBITMQ_URL;

if (!RABBITMQ_URL) {
  throw new Error('RABBITMQ_URL is missing in environment variables');
}

export const authClientConfig = {
  name: AUTH_CLIENT,
  transport: Transport.RMQ as const,
  options: {
    urls: [RABBITMQ_URL], // now it's string[]
    queue: 'auth_queue',
    queueOptions: { durable: true },
  },
};
