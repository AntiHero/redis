import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AppService }       from './app.service';

@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Post('data')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async postData(
    @Body() data: { [key: string]: string },
  ): Promise<void> {
    const keys = Object.getOwnPropertyNames(data);

    for (const key of keys) {
      await this.appService.setData(key, data[key]);
    }
  }

  @Get('data/:key')
  @UseInterceptors(CacheInterceptor)
  public getData(
    @Param('key') key: string,
  ): Promise<string | null | undefined> {
    return this.appService.getData(key);
  }
}
