![logo](doc/img/logo-banner.png)

# LabMate - a simple dashboard for your homelab

[![CI](https://github.com/francWhite/labmate/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/francWhite/labmate/actions/workflows/ci.yml)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/francWhite/labmate?include_prereleases)
![Docker Pulls](https://img.shields.io/docker/pulls/frankwhite/labmate)
![licence](https://img.shields.io/github/license/francWhite/labmate)


Monitor your homelab with ease! There is no need for complex configuration, just use the `docker-compose.yml` from
the [Getting started](#getting-started) chapter and get going.


## Sidenotes
LabMate was developed during an assignment for the course "Web Programming Lab" at the Lucerne University of Applied
Sciences.

# Getting started

Just want to try out **labmate**? Use de following docker-compose template:

```yaml
version: "3.9"

services:
  db:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db
    networks:
      - labmate-internal
  api:
    image: frankwhite/labmate-api:latest
    ports:
      - "8585:8000"
    networks:
      - labmate-internal
    depends_on:
      - db
  app:
    image: frankwhite/labmate:latest
    environment:
      - API_HOSTNAME=localhost
      - API_PORT=8585
    ports:
      - "8080:8080"
    depends_on:
      - api

volumes:
  mongodb_data:

networks:
  labmate-internal:
```

# Build from source

TODO: describe ENV

## Docker

Build api:

```shell
docker build -t labmate-api:dev packages/server
```

Build app:

```shell
docker build -t labmate:dev packages/client
```

### Run

Run api:

```shell
docker run -p 8000:8000 --rm --name labmate-api labmate-api:dev
```

Run app:

```shell
docker run -p 8001:8080 --rm --name labmate labmate:dev
```

### Compose

Build and run:

```shell
docker-compose up
```
