FROM node:18.12.1

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install --frozen-lockfile

COPY ./ ./

ENV NODE_ENV=production

RUN yarn build:all

CMD [ "yarn", "start:all" ]
