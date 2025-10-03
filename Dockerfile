FROM node:22-alpine AS build

RUN \
		--mount=type=cache,target=/var/cache/apk\
		apk add build-base

WORKDIR /app

COPY yarn.lock package.json .yarnrc.yml tsconfig.json ./

RUN yarn set version berry
RUN \
		--mount=type=cache,target=/app/.yarn/cache\
		yarn

FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . .

COPY --from=build /app .

CMD ["yarn", "start"]
