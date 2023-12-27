FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install -g vite@latest
RUN npm install

RUN npm run build