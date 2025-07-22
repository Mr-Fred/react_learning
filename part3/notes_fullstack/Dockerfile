## /Dockerfile

# 1. Install backend production dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY part3/notes_fullstack/package*.json ./
RUN npm ci --omit=dev

# 2. Create the final production image
FROM node:20-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
# Copy backend source code and the pre-built frontend.
# The .dockerignore file at the repository root prevents
# unnecessary files (like tests) from being included.
COPY part3/notes_fullstack/ ./

EXPOSE 3001
CMD ["node", "index.js"]