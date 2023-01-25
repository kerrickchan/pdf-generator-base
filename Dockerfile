FROM node:18-alpine AS Builder

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .

EXPOSE 8080
CMD ["yarn", "start"]
