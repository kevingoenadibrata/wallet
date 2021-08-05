# Mini Wallet Project
## Installing
1. Make sure you have docker and npm installed to your machine
2. Run  `./setup.sh` on the main directory to setup docker and npm
3. Docker is currently running on the background

## Running
1. Run `npm start` to run the local server
2. Use either postman or any API Client  and hit `localhost:3000`

## Stopping Docker
1. Run `docker compose down` to stop the current docker
2. Run `docker compose down -v` or simply `./setup -c` to stop the docker and remove volume and data

## What if docker doesn’t work on my machine
The Mini Wallet can also run on local memory, these are steps to configure the app to run on local memory instead of a database

1. find `.env` file in the main directory
2. modify `USE_LOCAL_DB=0` to `USE_LOCAL_DB=1`
3. run `npm install`
4. run `npm start`
5. The wallet app should be running

Note: when using local memory, data does not persist if you kill the server and rerun it again.

##  FAQ
1. What if when I hit the API it says connection refused?
	* Try waiting for a couple of seconds and run again, probably the docker is still setting up. 
2. How do I setup the authentication?
	* After hitting `/api/v1/init` make sure to plug in token to `Authentication: Bearer <token>`
3. What type of request body is accepted in this server?
	* `multipart/form-data` works best on this implementation
4. Somehow the database got corrupted, how do I reset?
	* To clean and redo the installation process, run `./setup.sh -c` and then`./setup.sh`
