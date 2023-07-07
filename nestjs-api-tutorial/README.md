# Nest.js backend API project

This is a Nest.js API project starter

## How to START

This project uses Docker to run the DB, therefore you need to start that container before starting the Server.

Start the docker containers in one terminal window

```cmd
docker compose up dev-db -d
```

Show the docker container running

```cmd
docker ps
```
Start the server

```cmd
yarn start:dev
```

## How to RE-START

```cmd
docker ps
```

## Migrate the DB schema

```cmd
prisma migrate deploy
```

