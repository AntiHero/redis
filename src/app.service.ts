import { CACHE_MANAGER }      from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache }              from 'cache-manager';

@Injectable()
export class AppService {
  public constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async setData(key: string, value: string) {
    await this.cacheManager.set(key, value);
  }

  public getData(key: string): Promise<string | null | undefined> {
    return this.cacheManager.get(key);
  }
}
