FROM node:18.14.2

WORKDIR /app

COPY package*.json ./

CMD ["npm", "install", " -g", "yarn"]

CMD ["yarn"]

COPY . .

CMD [ "yarn", "start:dev" ]