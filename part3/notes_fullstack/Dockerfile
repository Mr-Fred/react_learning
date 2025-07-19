## /Dockerfile

# 1. Build the frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /usr/src/app
COPY part2/notes_frontend/package*.json ./part2/notes_frontend/
RUN cd part2/notes_frontend && npm ci
COPY part2/notes_frontend/ ./part2/notes_frontend/
RUN cd part2/notes_frontend && npm run build

# 2. Build the backend
FROM node:20-alpine AS backend-builder
WORKDIR /usr/src/app
COPY part3/notes_fullstack/package*.json ./part3/notes_fullstack/
RUN cd part3/notes_fullstack && npm ci --omit=dev

# 3. Create the final production image
FROM node:20-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy backend dependencies
COPY --from=backend-builder /usr/src/app/part3/notes_fullstack/node_modules ./node_modules
# Copy backend source code
COPY part3/notes_fullstack/ ./
# Copy built frontend
COPY --from=frontend-builder /usr/src/app/part2/notes_frontend/dist ./dist

# The build:ui script is no longer needed inside the Dockerfile
# as we built the UI in a separate stage.

EXPOSE 3001
CMD ["node", "index.js"]