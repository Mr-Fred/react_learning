FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_BACKEND_URL=/api
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# The --host flag is necessary to expose the server to the host machine
CMD ["npm", "run", "dev", "--", "--host"]