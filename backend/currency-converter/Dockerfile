# Dockerfile for Currency Converter Microservice
FROM node:14

WORKDIR /app

COPY package.json /app
RUN npm install

COPY currency-converter.js /app

CMD ["node", "currency-converter.js"]
