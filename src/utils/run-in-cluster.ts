import cluster from 'cluster';
import os      from 'os';

export function runInCluster(bootstrap: () => Promise<void>) {
  const coresNum = os.cpus().length;

  if (cluster.isPrimary) {
    for (let i = 0; i < coresNum; ++i) {
      cluster.fork();
    }
  } else {
    bootstrap();
  }
}
