# Install postgres and expose the port of the db container
postgres:
	docker run --name sports_complex -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pass -d postgres:15-alpine

# Create the database
createdb:
	docker exec -it sports_complex createdb --username=root --owner=root sports_complex

# Drop the database
dropdb:
	docker exec -it sports_complex dropdb sports_complex

# Maka a new blank migration in src/database/migrations
migrate: 
	npx knex --migrations-directory=./src/database/migrations migrate:make $(MIGRATION) -x ts 

# Run the local server
server:
	npm run server

# Get the docker database IP address after running docker compose
# You can provide the ID after running docker ps and copying the container ID
# The IP is needed to add to the .env file
getdockerip:	
	docker inspect $(ID) | grep -i IPAddress


.PHONY: postgres createdb dropdb migrate server getdockerip