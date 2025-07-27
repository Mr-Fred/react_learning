FROM node:22

WORKDIR /usr/src/app
 
COPY package.json ./
RUN npm install
 
COPY . .
RUN npm install vite@latest --save-dev
 
# The --host flag is necessary to expose the server to the host machine
CMD ["npm", "run", "dev", "--", "--host"]