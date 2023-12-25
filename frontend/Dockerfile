FROM node:alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install --global vite@latest
RUN npm install

COPY . .

RUN npm run build