# Prime self serve
This is the repository for the Prime Self Serve App.  
  <br />
  <br />


## Setup

### Clone the repo  
```
git clone https://github.com/urbanpiper/prime-self-serve.git
```

### Frontend Setup  

Step 1. Move to client folder  
```
cd self_serve_client
```  

Step 2. Install dependencies  
```
yarn install
``` 

Step 3. To run frontend app  
```
yarn start
``` 


## To run the project inside docker container
Make sure you have docker hub and docker-compose installed on your system. 

Step 1. Move to project root folder.  

Step 2. Build and run container using docker-compose.
```
docker-compose up -d --build
```  
<br />
<br />
  


## Staging Deployment

Step 1. ssh into the ec2 instance.  

Step 2. Move to project folder
```
cd prime-self-serve/
```

Step 3. Pull the latest changes
```
git pull
```

Step 4. Build and restart the container
```
docker-compose up -d --build
```
