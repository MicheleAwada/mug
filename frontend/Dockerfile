FROM node:alpine

WORKDIR /frontend

COPY . .

RUN npm install -g vite@latest
RUN npm install

RUN npm run build --no-input