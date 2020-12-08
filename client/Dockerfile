
#Step 1
FROM node:10.15.3-alpine as build-step
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
RUN yarn build

# Step 2
FROM nginx:1.17.1-alpine
COPY --from=build-step app/dist/client /usr/share/nginx/html 
