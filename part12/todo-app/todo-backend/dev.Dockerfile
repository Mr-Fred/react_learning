FROM node:22

WORKDIR /usr/src/app

# Install curl for the healthcheck
RUN apt-get update && apt-get install -y curl

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]