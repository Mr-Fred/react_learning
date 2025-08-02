FROM node:22

# Install curl for the healthcheck and clean up apt-get cache to keep image small
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy package files and install dependencies first to leverage Docker cache.
# This step is only re-run if package*.json files change.
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

# Copy the rest of the application's source code
COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["npm", "start"]
