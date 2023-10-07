import os from 'os';
import { Application } from 'xirelta';
import { Axiom } from '@axiomhq/js';
import { logger } from './logger';

const branch = process.env.RAILWAY_GIT_BRANCH ?? process.env.PR_GIT_BRANCH ?? process.env.GIT_BRANCH;

// Flush stats about application once a second
setInterval(async () => {
    const axiom = new Axiom({
        token: process.env.AXIOM_TOKEN!,
        orgId: process.env.AXIOM_ORG_ID!,
    });
    try {
        const cpuData = os.loadavg();
        const cpu = {
            oneMinute: cpuData[0],
            fiveMinutes: cpuData[1],
            fifteenMinutes: cpuData[2],
        };
        const memoryData = process.memoryUsage();
        const memory = {
            rss: memoryData.rss, // -> Resident Set Size - total memory allocated for the process execution`,
            heapTotal: memoryData.heapTotal, // -> total size of the allocated heap`,
            heapUsed: memoryData.heapUsed, // -> actual memory used during the execution`,
            external: memoryData.external, // -> V8 external memory`,
        };
        axiom.ingest(process.env.AXIOM_DATASET!, {
            branch,
            eventType: 'stats',
            cpu,
            memory,
        });
    } catch (error: unknown) {
        logger.error('Failed to ingest stats', {
            error: error instanceof Error ? error : new Error(String(error)),
        });
    } finally {
        await axiom.flush();
    }
}, 1_000);

const app = new Application({
    logger,
});

await app.start();
