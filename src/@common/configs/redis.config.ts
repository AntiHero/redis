import { registerAs } from '@nestjs/config';

export const REDIS = 'REDIS';

export interface RedisConfig {
  [REDIS]: {
    host: string;
    port: string;
    ttl: string;
  };
}

export const redisConfig = registerAs(REDIS, (): RedisConfig[typeof REDIS] => {
  return {
    host: <string>process.env.REDIS_HOST,
    port: <string>process.env.REDIS_PORT,
    ttl: <string>process.env.REDIS_TTL,
  };
});
