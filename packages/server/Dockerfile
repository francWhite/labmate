FROM node:19-alpine
WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/server.js"]
