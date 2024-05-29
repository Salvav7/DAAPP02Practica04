#Image
FROM node:18.15.0 as node


#Set working directory
WORKDIR /usr/src/app

#add the source code to app
COPY . / /usr/src/app

#Install all the dependencies
RUN npm ci

#Build the app
RUN npm run build --prod

### NGINX
FROM nginx:1.21.3-alpine

#Copy the build output to replace the default nginx contents.
COPY --from=node /usr/src/app/dist/daapp02-practica04 /usr/share/nginx/html

#Expose the port
EXPOSE 80