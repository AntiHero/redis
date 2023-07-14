import { NestFactory }  from '@nestjs/core';

import { AppModule }    from './app.module';
import { runInCluster } from './utils/run-in-cluster';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
runInCluster(bootstrap);
