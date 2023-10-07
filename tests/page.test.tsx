import { expect, test } from 'bun:test';
import { Application } from 'xirelta';
import pretty from 'pretty';
import { randomUUID } from 'crypto';

test('page renders', async () => {
    const app = new Application({
        logger: {
            debug: () => {},
            info: () => {},
            error: () => {},
        }
    });
    const server = await app.start();

    const response = await fetch(`http://localhost:${server.port}/`).then(response => response.text());

    expect(response).toContain('Xirelta Web Framework');
    expect(pretty(response)).toMatchSnapshot();

    await app.stop();
});

test('404 renders', async () => {
    const app = new Application({
        logger: {
            debug: () => {},
            info: () => {},
            error: () => {},
        }
    });
    const server = await app.start();

    const response = await fetch(`http://localhost:${server.port}/${randomUUID()}`).then(response => response.text());

    expect(response).not.toContain('Xirelta Web Framework');
    expect(pretty(response)).toMatchSnapshot();

    await app.stop();
});
