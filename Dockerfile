FROM gdssingapore/airbase:node-24-builder AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM gdssingapore/airbase:node-24

WORKDIR /app

RUN npm i -g serve

COPY --from=builder --chown=app:app /app/dist ./dist

USER app

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]