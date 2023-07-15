import cluster from 'cluster';
import os      from 'os';

export function runInCluster(bootstrap: () => Promise<void>) {
  const coresNum = os.cpus().length - 1;

  if (cluster.isPrimary) {
    for (let i = 0; i < coresNum; ++i) {
      const worker = cluster.fork();

      worker.on('exit', () => {
        console.log(`worker ${worker.process.pid} died`);
        console.log(`worker ${worker.process.pid} restarting...`);
        cluster.fork();
      });
    }
  } else {
    bootstrap();
  }
}
