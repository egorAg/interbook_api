FROM node:latest

WORKDIR /usr/src/app

COPY . ./

RUN yarn

RUN npm i -g @nestjs/cli

RUN nest build

CMD [ "node", "dist/main.js" ]