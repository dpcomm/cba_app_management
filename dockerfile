FROM node:20-alpine AS react-builder
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=react-builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]