import { Application } from 'xirelta';
import { Logger, z } from '@imlunahey/logger';

const app = new Application({
    logger: new Logger({
        service: 'website',
        defaultMeta: {
            branch: process.env.RAILWAY_GIT_BRANCH ?? process.env.PR_GIT_BRANCH ?? process.env.GIT_BRANCH,
        },
        schema: {
            debug: {
                'Registered routes': z.object({}).passthrough(),
            },
            info: {
                'Web server started': z.object({}).passthrough(),
                'Web server stopping': z.object({}).passthrough(),
                'Web server stopped': z.object({}).passthrough(),
            }
        }
    }),
});

await app.start();
