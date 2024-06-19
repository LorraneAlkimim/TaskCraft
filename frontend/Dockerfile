FROM node:lts-alpine

WORKDIR /usr/app/frontend

COPY package*.json ./

RUN npm install vite -g 
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]