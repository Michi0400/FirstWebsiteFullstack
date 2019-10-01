

FROM node:alpine as builder

ARG env=prod

RUN apk update && apk add --no-cache make git

## Build the angular app in production mode and store the artifacts in dist folder

WORKDIR /app
COPY package.json package-lock.json  /app/
RUN cd /app && npm install
COPY .  /app
## RUN npm run build (eventuell nicht benötigt)

RUN cd /app && npm run build:$env

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/default.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
