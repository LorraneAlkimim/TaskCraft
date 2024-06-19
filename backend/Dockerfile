FROM node:lts-alpine

WORKDIR /usr/app/backend

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:watch"]