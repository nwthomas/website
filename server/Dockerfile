FROM node:14.16.0-alpine3.13

# Build process
WORKDIR /server
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# Create user
RUN addgroup app && adduser -S -G app app
USER app

# Start server
EXPOSE 3000
ENTRYPOINT ["node", "dist/index.js"]