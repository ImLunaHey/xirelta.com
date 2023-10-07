import os from 'os';
import { Application } from 'xirelta';
import { Logger, z } from '@imlunahey/logger';
import { Axiom } from '@axiomhq/js';

const logger = new Logger({
    service: 'website',
    defaultMeta: {
        branch: process.env.RAILWAY_GIT_BRANCH ?? process.env.PR_GIT_BRANCH ?? process.env.GIT_BRANCH,
        eventType: 'log',
    },
    schema: {
        debug: {
            'Registered routes': z.object({}).passthrough(),
        },
        info: {
            'Web server started': z.object({}).passthrough(),
            'Web server stopping': z.object({}).passthrough(),
            'Web server stopped': z.object({}).passthrough(),
        },
        error: {
            'Failed to ingest stats': z.object({}).passthrough(),
        }
    }
});

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
