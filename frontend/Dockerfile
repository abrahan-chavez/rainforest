# Stage 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
