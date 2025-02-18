# Dockerfile for Trade Simulator Microservice
FROM node:14

WORKDIR /app

COPY package.json /app
RUN npm install

COPY trade-simulator.js /app

CMD ["node", "trade-simulator.js"]
