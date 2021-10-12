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
RUN echo "PORT: ${PORT}"
ENV DEV_ENV=$DEV_ENV
ENV EMAIL_PORT=$EMAIL_PORT
ENV HOST_NAME=$HOST_NAME
ENV PASSWORD=$PASSWORD
ENV PERSONAL_EMAIL=$PERSONAL_EMAIL
ENV PORT=$PORT
ENV TLS=$TLS
ENV USERNAME=$USERNAME

# Start server
EXPOSE 3000
ENTRYPOINT ["node", "dist/index.js"]