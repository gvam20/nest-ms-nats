FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
