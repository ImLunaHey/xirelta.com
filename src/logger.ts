import { Logger, z } from '@imlunahey/logger';

const branch = process.env.RAILWAY_GIT_BRANCH ?? process.env.PR_GIT_BRANCH ?? process.env.GIT_BRANCH;
export const logger = new Logger({
    service: 'website',
    defaultMeta: {
        branch,
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
            request: z.object({
                headers: z.object({}).passthrough(),
            }).passthrough(),
        },
        error: {
            'Failed to ingest stats': z.object({}).passthrough(),
        }
    }
});
