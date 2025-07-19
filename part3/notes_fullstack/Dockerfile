## /Dockerfile

# 1. Build the frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY part2/notes_frontend/package*.json ./
RUN npm ci
COPY part2/notes_frontend/ ./
RUN npm run build

# 2. Build the backend
FROM node:20-alpine AS backend-builder
WORKDIR /app
COPY part3/notes_fullstack/package*.json ./
RUN npm ci --omit=dev

# 3. Create the final production image
FROM node:20-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy backend dependencies
COPY --from=backend-builder /app/node_modules ./node_modules
# Copy backend source code
COPY part3/notes_fullstack/ ./
# Copy built frontend
COPY --from=frontend-builder /app/dist ./dist

# The build:ui script is no longer needed inside the Dockerfile
# as we built the UI in a separate stage.

EXPOSE 3001
CMD ["node", "index.js"]