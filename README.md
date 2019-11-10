# Guardrails Challenge

This represents the solution to the [GuardRails Challenge](https://github.com/guardrailsio/full-stack-engineer-challenge).

It consists of the following tech stack:

* A [docker](https://www.docker.com/get-started) setup in order to serve the application in multiple containers hoisting the different services we need
* A backend that exposes a REST API using `Node.js` with [Express](http://expressjs.com/). This API contains several services running inside of it and it's also connected to some services exposed in the docker environment:
  * [Redis](https://www.npmjs.com/package/redis) for caching purposes.
  * [PM2](https://pm2.keymetrics.io/) to handle clustering and auto-restart on failure.
  * [Compression](https://www.npmjs.com/package/compression) to increase response performance.
  * [Swagger](https://swagger.io/) for API documentation.
  * [Rate limiting](https://www.npmjs.com/package/express-rate-limit) to prevent issues with too many requests per second.
  * [Sentry](https://sentry.io/) to log system errors and keep track of them.
  * [Winston](https://www.npmjs.com/package/winston) to do logging.
  * [PostgreSQL](https://www.postgresql.org/) as DB and [Sequelize](http://docs.sequelizejs.com/manual/installation/getting-started) as abstraction.
  * [Mocha](http://mochajs.org/) + node's [assert module](https://nodejs.org/api/assert.html) for testing.
* A frontend Dashboard built with [React](https://reactjs.org/) in order to display the data.

## API Description

The API exposes 3 necessary endpoints for this to work:

* `GET /scans-results` to get the list of all Security Scan Results.
* `GET /scans-results/{id}` to get a single Security Scan Result item.
* `POST /scans-results` in order to create Security Scan Result items into the database.

The API documentation is exposed on `/api-docs` with [Swagger](https://swagger.io/).

The API is available on port `5000` in your local env after intalling and running the containers.

## Install instructions

First you should install [docker](https://www.docker.com/get-started) locally, this is due to the project running in a docker container. You won't need anything more, `docker` will download everything.

After installing docker, clone this repository. You'll notice an executable file `docker-challenge`, this file will help you running commands to specific containers.

You run `./docker-challenge up -d --build` to start running tne container and all dependencies.

### DB Commands

* `./docker-challenge exec api npm run migrate` to run migrations.
* `./docker-challenge exec api npm run unmigrate` to revert migrations.
* `./docker-challenge exec api npm run generate-migration` to generate a migration file.
* `./docker-challenge exec api npm run sequelize` to run sequelize commands based on your needs.

## Running the server

* `./docker-challenge exec api npm run build` to transpile JS code in order to use ES6 in NodeJS(no needed for dev).
* `./docker-challenge exec api npm run build:watch` to auto-generate the transpiled files on changes.
* `./docker-challenge exec api npm start` to run the server.

Notice that after starting the container, the server will be running already.

## To Take into Consideration

We are using [sequelize](http://docs.sequelizejs.com/manual/installation/getting-started) in order to manage DB operations.
