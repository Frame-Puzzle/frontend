# Build Stage
FROM node:20.15-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the application
COPY . .

EXPOSE 3000
CMD ["npm", "build"]
