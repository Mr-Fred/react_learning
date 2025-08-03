FROM node:18-alpine

WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci --include-dev

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "nodemon", "index.js" ]