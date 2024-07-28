# Build Stage
FROM node:20.15-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the application
COPY . .
RUN npm run build

# Run Stage
FROM node:20.15-alpine

WORKDIR /app

# Copy only the built files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Command to run the app
CMD ["npm", "run"]
