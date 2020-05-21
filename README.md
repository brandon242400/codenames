### Start Application with Docker

#### Requirements
* docker
* docker-compose
* Node 12.6.3
* npm 6.14.4

#### Start application
```
// Install client node modules
$ cd <path/to/repo>/client
$ npm ci


// Install server node modules
$ cd <path/to/repo>/server
$ npm ci


// Start containers
$ docker-compose -f <path/to/repo>/docker/docker-compose.yml up --build -d
```

Application hosted on http://localhost:3000

```
// Stop containers
$ docker-compose -f <path/to/repo>/docker/docker-compose.yml down
```