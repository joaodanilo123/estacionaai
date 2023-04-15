FROM node:alpine

ENV NODE_ENV=development

ENV JTW_SECRET=testejwt

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN ["npx", "prisma", "migrate", "dev"]
CMD ["npm", "run", "dev"]
