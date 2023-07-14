import { CacheModule }                 from '@nestjs/cache-manager';
import { CacheStore, Module }          from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore }                  from 'cache-manager-redis-store';

import {
  REDIS,
  RedisConfig,
  redisConfig,
} from './@common/configs/redis.config';
import { AppController }               from './app.controller';
import { AppService }                  from './app.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<RedisConfig>) => ({
        store: redisStore as unknown as CacheStore,
        host: configService.get(`${REDIS}.host`, { infer: true }),
        port: configService.get(`${REDIS}.port`, { infer: true }),
        ttl: configService.get(`${REDIS}.ttl`, { infer: true }),
      }),
    }),
    ConfigModule.forRoot({
      load: [redisConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
