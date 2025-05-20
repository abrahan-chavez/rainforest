# Stage 1: Build Angular app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .
run npm i @fontsource/material-symbols-rounded --save
RUN apt-get update && apt-get install -y ca-certificates
RUN npm run build -- --configuration production

# Stage 2: Serve Angular app with Nginx
FROM nginx:alpine

# Copy built Angular app from Stage 1
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy custom Nginx config if needed (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80
