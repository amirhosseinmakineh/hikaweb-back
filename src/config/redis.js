import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.error('Redis Client Error', err));

export async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}

export default client;
