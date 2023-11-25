FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install --frozen-lockfile --production
RUN yarn cache clean
RUN yarn run build

RUN yarn start:dev