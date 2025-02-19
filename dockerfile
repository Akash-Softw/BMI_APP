FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

ENV DB_HOST=localhost
ENV DB_USER=postgres
ENV DB_PASSWORD=Manago@123
ENV DB_NAME=bmi_app
ENV DB_PORT=5432
RUN apk add --no-cache bash
CMD ["node", "server.js"]
