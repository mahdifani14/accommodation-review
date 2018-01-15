# Accommodation Reviews

Accessing the reviews list with pagination and filtering by `traveledWith` types.

### Install MongoDB First
Please before running the code, install MongoDB on your local machine.
You can download the command line version from the link below:

<https://docs.mongodb.com/getting-started/shell/installation/>

## Steps
### 1. Run Server
To run the server, first run your MogoDB on separated terminal then run the following commands on the root directory:
```bash
npm install
npm start
```
To access the server swagger web interface, go to <http://localhost:8080> in your browser.
You can also use the already generated sample authentication token value below to execute your calls:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0IiwibmFtZSI6Ik1haGRpIEZhbmktRGlzZmFuaSIsInVzZXJfdHlwZSI6ImFkbWluIn0.FFj0JMT5pAEnMXZZ7tl7c07S31a-ZnGXY84tXNdqh1s`

### 2. Run Frontend
You need three terminals running in parallel, one for each of the following steps:
- Terminal 1: Run MongoDB
```bash
mongod
```
- Terminal 2: Run Server from the root directory
```bash
npm start
```
- Terminal 3: Run Frontend, after going to the `frontend/` directory, run the following commands:
```bash
cd frontend/
npm install
npm start
```
To access the frontend and see the reviews, go to <http://localhost:8000> or <http://localhost:8000/reviews> in your browser.