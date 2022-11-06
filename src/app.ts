import { createApp } from "./lib/createApp";
import cluster from "cluster";
import { Application } from "express";
import "reflect-metadata"

const PORT: number = Number(process.env.PORT) || 5000;

const main = async () => {
    try {
        if (cluster.isMaster) {
            const cpuCount: number = require('os').cpus().length;
            for (let i: number = 0; i < cpuCount; i += 1) {
                cluster.fork();
            }
            cluster.on('exit',  (worker) => {
                console.log(`Worker ${worker.id} died but it will be restarted`);
                cluster.fork();
            });

            return null;
        } else {
            const app: Application = await createApp();
            app.listen(PORT, async () => {
                console.log(
                    `Server started on port: http://localhost:${PORT}`
                );
        });
      return app;
    }
    } catch (error) {
        console.error(error); 
        process.exit(1);
        return null;
    }
}

export default main();