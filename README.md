## Project setup
---
### Local setup

+ Pull the repo

+ Install dependencies `npm install`
+ Build the project `npm run build`
+ Create postgres container and expose it `make postgres`
+ Create the database in the container `make createdb`
+ Run the migrations `npm run migrate`
+ And thats it, you can run the server `npm run dev`

---
### Setup with Docker Compose

+ Pull the repo

+ Run docker compose `docker-compose up --build`

+ When its done building and the containers are up you have to retrieve the db container ip address and paste it in the PG_HOST env variable

+ Run `docker ps`

Get the db container ID (its highlighted in the snippet)
| CONTAINER ID | IMAGE            | COMMAND              | CREATED        | STATUS      | PORTS                | NAMES               |
|--------------|------------------|----------------------|----------------|-------------|----------------------|---------------------|
| 8b2c3b66f072 | sports_complex-app | "docker-entrypoint.s…" | 26 seconds ago | Up 13 seconds | 0.0.0.0:3000->3000/tcp | sports_complex-app-1 |
| **1b1c490b647d** | postgres:15-alpine | "docker-entrypoint.s…" | About an hour ago | Up 13 seconds | 0.0.0.0:5432->5432/tcp | sports_complex-db-1  |

+ Copy the container id and run `ID=1b1c490b647d make getdockerip`
+ Copy the ip address and paste in the PG_HOST environment variable
+ Run `docker-compose down`
+ Run `docker-compose up --build`
---

### Api documentation

https://documenter.getpostman.com/view/24650906/2s93RZLUks

