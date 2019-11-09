# JobsScrapper

## Install instructions

First you should install [docker](https://www.docker.com/get-started) locally, this is due to this project being ran in a docker container.

After installing docker, clone this repository. You'll notice an executable file `./docker-challenge`, this file will help you running commands to specific containers.

You run `./docker-challenge up -d --build` to start running tne container and all dependencies.

### DB Commands

* `./docker-challenge exec api npm run migrate` to run migrations.
* `./docker-challenge exec api npm run unmigrate` to revert migrations.
* `./docker-challenge exec api npm run generate-migration` to generate a migration file.
* `./docker-challenge exec api npm run sequelize` to run sequelize commands based on your needs.

## Running the server

* `./docker-challenge exec api npm run build` to transpile JS code in order to use ES6 in NodeJS(no needed for dev).
* `./docker-challenge exec api  npm run build:watch` to auto-generate the transpiled files on changes.
* `./docker-challenge exec api  npm start` to run the server.

Notice that after starting the container, the server will be running already.

## To Take into Consideration

We are using [sequelize](http://docs.sequelizejs.com/manual/installation/getting-started) in order to manage DB operations.
