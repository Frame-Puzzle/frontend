FROM node:20.15-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM alpine:3.15
WORKDIR /app
COPY --from=build /app/dist ./dist
