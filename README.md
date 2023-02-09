![logo](doc/img/logo-banner.png)

# LabMate - a simple dashboard for your homelab

LabMate was developed during an assignment for the course "Web Programming Lab" at the Lucerne University of Applied
Sciences

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