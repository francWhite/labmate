![logo](doc/img/logo-banner.png)

# Labmate - a simple dashboard for your homelab

[![CI](https://github.com/francWhite/labmate/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/francWhite/labmate/actions/workflows/ci.yml)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/francWhite/labmate?include_prereleases)
![Docker Pulls](https://img.shields.io/docker/pulls/frankwhite/labmate)
![licence](https://img.shields.io/github/license/francWhite/labmate)


Monitor your homelab with ease! There is no need for complex configuration, just use the `docker-compose.yml` from
the [Getting started](#getting-started) chapter and get going.


## Sidenotes
Labmate was developed during an assignment for the course "Web Programming Lab" at the Lucerne University of Applied
Sciences.

# Getting started

Just want to try out **labmate**? Use de following docker-compose template and navigate to `http://localhost:8998`

```yaml
version: "3.9"

services:
  db:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db
  api:
    image: frankwhite/labmate-api:v1.0.2
    environment:
      - MONGO_URL=mongodb://db:27017/labmate
      - PORT=8000
    ports:
      - "8585:8000"
    depends_on:
      - db
  app:
    image: frankwhite/labmate:v1.0.2
    environment:
      - API_HOSTNAME=localhost
      - API_PORT=8585
    ports:
      - "8998:8080"
    depends_on:
      - api

volumes:
  mongodb_data:
```

# Build from source

### Prerequisites

* [Node.js](https://nodejs.org/en/) >= 19.6
* [npm](https://www.npmjs.com/) >= 9
* [MongoDB instance](https://www.mongodb.com/)
* Update `packages/server/.env` with your MongoDB connection string

Clone repo, install dependencies and build packages:

```shell
git clone https://github.com/francWhite/labmate.git
cd labmate
npm install
npm run build
npm start
```

To run the applications individually, use the following commands:

```shell
cd labmate/packages/server
npm run build
npm start

cd labmate/packages/client
npm run build
npm start 
```

## Docker
Or build the application / docker images and run the containers with the included `docker-compose.yml`:

```shell
docker-compose up --build
```
