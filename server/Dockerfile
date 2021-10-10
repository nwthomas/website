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

# Environment variables
ARG DEV_ENV
ARG EMAIL_PORT
ARG HOST_NAME
ARG PASSWORD
ARG PERSONAL_EMAIL
ARG PORT
ARG TLS
ARG USERNAME

# Start server
EXPOSE 3000
ENTRYPOINT ["node", "dist/index.js"]