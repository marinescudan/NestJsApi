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

