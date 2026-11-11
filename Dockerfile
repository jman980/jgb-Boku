FROM node:22-alpine AS dependencies

RUN apk add --no-cache build-base cmake python3 linux-headers

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM ghcr.io/playit-cloud/playit-agent:latest AS playit

FROM node:22-alpine

RUN apk add --no-cache ca-certificates tini

WORKDIR /app

COPY --from=playit /usr/local/bin/playitd /usr/local/bin/playitd
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY index.js ./

ENTRYPOINT ["/sbin/tini", "-g", "--"]
CMD ["sh", "-c", "test -n \"$PLAYIT_SECRET\" || { echo 'Set PLAYIT_SECRET in Render environment variables'; exit 1; }; playitd --secret=\"$PLAYIT_SECRET\" --platform-docker & exec node index.js"]