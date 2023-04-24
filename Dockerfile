FROM node:alpine

ENV NODE_ENV=development

ENV JTW_SECRET=testejwt

RUN apk update && apk add bash
SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
