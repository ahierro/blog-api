# Blog API

## Description
This project is a REST API for a blog that manages users, posts and authentication.

## Technologies used in this project
- Node.js
- NestJS
- MongoDB
- Mongoose
- Typescript
- Swagger
- Passport JWT
- Passport Local
- Bcrypt
- Docker
- Testcontainers (for e2e tests, used for starting a mongoDB container)

## Run Locally
- Make sure you have installed Node.js version 20.10.0 and MongoDB
- Make sure you have a .env file with the environment variables
- Make sure MongoDb is running
- The application will be available at http://localhost:3000
- You can access the Swagger documentation at http://localhost:3000/api
- The .env file should be placed at root folder and contain the following environment variables:
```dotenv
MONGO_URL=mongodb://localhost:27017/blog
JWT_SECRET=S3Cr3t
EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=10
```
- Make sure you have installed the NestJS CLI if you are going to run the application in dev mode
```bash
npm i -g @nestjs/cli
```
```bash
# install dependencies
npm install

# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
# Run with Docker
- It is necessary to have Docker installed and running
- Docker will create a container with the application and another with the MongoDB database
- The application will be available at http://localhost:3000
- You can access the Swagger documentation at http://localhost:3000/api

- The .env file should be placed at root folder and contain the following environment variables:
```dotenv
MONGO_URL=mongodb://mongo:27017/blog
JWT_SECRET=S3Cr3t
EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=10
```

```bash
docker compose up --build
```

## Run e2e tests
- e2e tests are written using Jest, Supertest and Testcontainers (It requires Docker installed and running)
```bash
npm run test:e2e
```

## Swagger Docs
http://localhost:3000/api
![swagger](/pictures/swagger_api.JPG "Swagger")

## Authentication

### Register a user
![register](/pictures/register.JPG "register")
### Login and copy JWT token that is returned on the response body
![login](/pictures/login.JPG "login")
### Click on Authorize Button
![auth_button](/pictures/auth_button.JPG "auth_button")
### Paste the token and click on Authorize
![auth_pop_up](/pictures/auth_pop_up.JPG "auth_pop_up")

