FROM node:20.9.0-alpine

WORKDIR /app

# COPY package.json package-lock.json ./
COPY . .

# Install all necesary
RUN apk update && apk add --no-cache bash curl jq
RUN apk add --no-cache curl
RUN npm install --frozen-lockfile
RUN npm install esbuild@0.20.2
RUN npm i -g serve

# Run the build process
RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
