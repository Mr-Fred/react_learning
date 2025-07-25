FROM node:20-buster

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

ARG VITE_BACKEND_URL=http://localhost:3000
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]