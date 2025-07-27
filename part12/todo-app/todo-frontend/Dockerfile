ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

FROM base AS unit-tester

COPY . .
RUN CI=true npm test

FROM unit-tester AS builder
ARG VITE_BACKEND_URL=http://localhost:3000
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build

FROM nginx:alpine AS server
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80