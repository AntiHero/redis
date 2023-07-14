import { CacheInterceptor }             from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  public trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();

    return request.params[Object.getOwnPropertyNames(request.params)[0]] || '';
  }
}
