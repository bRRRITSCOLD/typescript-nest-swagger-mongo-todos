## Description

TypeScript + Nest + Swagger + Mongo Todo API

## Installation

```bash
$ npm install
```

## Running the app

### Local
* make sure mongodb is installed and running on machine - use VSCode Debug Configuration "Launch main file w/ ts-node"

```
https://localhost:3001/todos-api/v1/docs
```

### Development
* set environment variables - NODE_ENV, API_BASE_PATH, TODOS_DATABASE, MONGO_DB_HOST, MONGO_DB_PORT

```bash
$ npm run start
```

```
https://localhost:3001/todos-api/v1/docs
```

###  Watch
* set environment variables - NODE_ENV, API_BASE_PATH, TODOS_DATABASE, MONGO_DB_HOST, MONGO_DB_PORT

```bash
$ npm run start:dev
```

```
https://localhost:3001/todos-api/v1/docs
```

### Incremental Rebuild (Webpack)
* set environment variables - NODE_ENV, API_BASE_PATH, TODOS_DATABASE, MONGO_DB_HOST, MONGO_DB_PORT

```bash
$ npm run webpack
$ npm run start:hmr
```

```
https://localhost:3001/todos-api/v1/docs
```

### Production
* set environment variables - NODE_ENV, API_BASE_PATH, TODOS_DATABASE, MONGO_DB_HOST, MONGO_DB_PORT

```bash
$ npm run prod
```

```
https://localhost:3001/todos-api/v1/docs
```

## License

  MIT license.
