# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json nginx.conf ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
ADD nginx.conf /app/nginx.conf
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]