FROM node:latest

ONBUILD RUN mkdir /usr/src/backend
WORKDIR /usr/src/backend

COPY package.json /usr/src/backend
RUN yarn install
COPY . /usr/src/backend

CMD ["yarn", "start:dev"]