![logo](doc/img/logo-banner.png)

[![CI](https://github.com/francWhite/labmate/actions/workflows/ci.yml/badge.svg)](https://github.com/francWhite/labmate/actions/workflows/ci.yml)

# LabMate - a simple dashboard for your homelab

Monitor your homelab with ease! There is no need for complex configuration, just use the `docker-compose.yml` from
the [Getting started](#getting-started) chapter.


## Sidenotes
labmate was developed during an assignment for the course "Web Programming Lab" at the Lucerne University of Applied
Sciences.

# Getting started

Just want to try out **labmate** or install it in your homelab? Use de following docker-compose template:

```yaml
TBD
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