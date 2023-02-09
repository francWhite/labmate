FROM node:19-alpine AS build

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/dist/client /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
