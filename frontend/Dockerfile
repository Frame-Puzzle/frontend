# Build Stage
FROM node:20.15-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "build"]
CMD ["npx", "serve", "-s", "dist"]