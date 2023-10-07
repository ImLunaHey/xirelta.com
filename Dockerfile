FROM oven/bun:canary

WORKDIR /app

COPY assets /app/assets
COPY src /app/src
COPY bun.lockb package.json tsconfig.json /app/

RUN bun i

# Ensure we're 100% on the newest version
RUN bun upgrade --canary

CMD bun run start