FROM node:18.14.2

WORKDIR /app

COPY package*.json ./

CMD ["npm", "install", " -g", "yarn"]
CMD ["npm", "install", "-g", "@nestjs/cli"]
CMD ["yarn", "install"]

COPY . .

CMD [ "yarn", "start:dev" ]