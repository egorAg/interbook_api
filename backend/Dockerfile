FROM node:18.14.2

WORKDIR /app

COPY package*.json ./

CMD ["npm", "install", " -g", "yarn"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]