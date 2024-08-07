FROM node:20.9.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
