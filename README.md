# NestJsTutorials

Nest JS is a framework for building scalable Node.js webapplication with Typescript. To read this code you need a basic understanding of ES6 and Typescript.

## What is Nest JS

*Do not confuse this with Next JS which is a React framework, or Nuxt JS which is a Vew framework.

Nest JS is a Node.js framework, that fully embraces Typescript, it is different from Expres JS, which is not opinionated, it doest suggest how to architect your application. 
Express JS is good for small projects. 

Nest JS uses express under the hood, it doesnt try to reinvent the wheel. It allows to create scalable, testable and maintanable applications. It uses modularity and its somtimes called the "Angular for Backend".

## Why would you used it?

STRUCTURE

SECURITY

MICROSERVICES

MODULARITY

REST API

TYPESCRIPT

GRAPHQL

POPULARITY & COMUNITY

## How to start a Nest JS project

First you have to have [Node.js](https://nodejs.org/en) installed on you machine, you can use [NVM](https://github.com/nvm-sh/nvm) (a Node version manager).

Test this by typing this in you OS terminal

```cmd
npm -v
```

```cmd
node -v
```

Second you need to intsll [NEXT CLI](https://docs.nestjs.com/cli/overview). 

```cmd
npm install -g @nestjs/cli
```
The Nest CLI is a tool you can use on your computer to create, work on, and manage your Nest applications. It helps you with various tasks like setting up the initial project, running it during development, and preparing it for distribution when it's ready for production. It promotes good practices for organizing your apps in a smart way.

Once installed, you can invoke CLI commands directly from your OS command line through the nest executable. See the available nest commands by entering the following:

```cmd
nest --help
```

## Generating the first Nest JS app

```cmd
nest new <app-name>
```


## Generating a module

```cmd
nest g module <module-name>
```



## Generating a controller

```cmd
nest g controller <controller-name>
```



## Generating a service

```cmd
nest g service <service-name>
```

## Add docker

Create a docker-compose.yml file
```yml
# docker-compose.yml

version: '3.8'
services:
  dev-db:
    image: postgres:13
    ports:
      - 5434:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    networks:
      - freecodecamp
networks:
  freecodecamp:
    name: freecodecamp

```

Start the docker container using command: ```docker compose up <name-of-db> -d```

```cmd
docker compose up dev-db -d
```

```cmd
docker ps
```

View docker logs
```cmd
docker logs 
```

Remove docker container using command: ```docker compose rm <db-name> [-s -f -v]```, see options below.
```cmd
Options:
  --dry-run   Execute command in dry run mode
  -f, --force     Don't ask to confirm removal
  -s, --stop      Stop the containers, if required, before removing
  -v, --volumes   Remove any anonymous volumes attached to containers


>docker compose rm dev-db -s -f -v
```

## Add a Database, install Prisma

Install prisma packages
```cmd
yarn add prisma@lates
yarn add @prisma/client
```

## Init prisma

This creates an .env file with some helpfull configs,
and a ```/prisma``` folder whee the schema is defined.
```cmd
npx prisma init
```

## Start Prisma Studio

```cmd
npx prisma studio
```

# Creare AUTH API

## Validate request

To validate you can use Nest pipes that validate datatypes or classes, to do so install ```class-validator``` and ``` class-transformer``` packages.

```cmd
yarn add class-validator class-transformer
```

## Encript the password

There are many packages you can use to encript passwords one is ```argon2```

```cmd
yarn add argon2
```


# Use CONFIG module

Instal the nestjs/config module to use it in the project
```cmd
yarn add @nestjs/config
```


# Use JWT with the Passport library

```cmd
 yarn add @nestjs/passport passport
 yarn add @nestjs/jwt passport-jwt
 yarn add -D @types/passport-jwt
```