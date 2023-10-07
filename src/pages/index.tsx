import { type RouteWithParams } from 'xirelta';
import { logger } from '../logger';

const route: RouteWithParams<'*', '/'> = (request): JSX.Element => {
    logger.info('request', {
        method: request.method,
        path: request.path,
        body: request.body,
        params: request.params,
        headers: request.safeHeaders,
    });
    return <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Xirelta</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body className='bg-[#0d0e11] h-screen flex items-center justify-center'>
            <main className='w-[500px] text-center'>
                <header className='p-2 mb-[12px] rounded-[4px] border-[2px] border-gray-200 text-gray-400 text-center'>
                    <a href="https://github.com/ImLunaHey/xirelta"><img src="https://raw.githubusercontent.com/ImLunaHey/xirelta/main/.github/assets/logo.png" alt="Xirelta Logo" /></a>
                    <a href="https://github.com/ImLunaHey/xirelta"><h1>Xirelta Web Framework</h1></a>
                </header>

                <section className='p-2 mb-[12px] rounded-[4px] border-[2px] border-gray-200 text-gray-400'>
                    <h2>Installation</h2>
                    <pre><code>bun add xirelta</code></pre>
                </section>

                <footer className='p-2 mb-[12px] rounded-[4px] border-[2px] border-gray-200 text-gray-400'>
                    <p>License: MIT</p>
                </footer>
            </main>
        </body>
    </html>;
};

export default route;
