# Build stage 1
# This state builds our TypeScript and produces an intermediate Docker image containing the compiled JavaScript code.

FROM node:erbium-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx tsc

EXPOSE 4000

CMD npm start






