FROM node:19-alpine AS build

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npm run build --omit=dev

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/dist/client /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
