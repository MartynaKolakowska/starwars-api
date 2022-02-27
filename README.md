## Installation

```bash
$ yarn
```

## Running the app

```bash
# run database first
$ docker-compose up

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# build
$ yarn build

# production mode
$ yarn run start:prod
```

Api should run on `http://localhost:3000/`

Swagger/OpenApi doc : `http://localhost:3000/api`

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
