FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "run", "start:dev"]
