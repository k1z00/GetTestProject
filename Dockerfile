# Этап сборки (build stage)
FROM node:18 AS build
WORKDIR /my-project
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Этап запуска (run stage)
FROM nginx:latest
COPY --from=build /my-project/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

