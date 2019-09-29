FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

COPY ./wait-for-it.sh .

COPY .env* ./

ENV NODE_ENV production

EXPOSE 4000

CMD ["npm", "run", "start:prod"]