### TASK 4.1P
START USING:
 -- npm //to install dependencies

 -- node server.js //to start the server

 ****Done REST API with different folders
 ****SIMPLE HAVE TO RUN THE API IN THE POSTMAN
http://localhost:3000/v1/calculate/add?num1=3&num2=2 

### TASK 4.2C (SOME CHANGES IN THE CODE) -- ALL ARE SAME ONLY SOME CALCULATOR SERVICE IS ADDED

### TASK 5.1P COMMANDS
- docker login
- docker build . -t s224748993/converterapp //building image command
- docker run -p 49160:3000 s224748993/converterapp //run the command

  ## Now check in chrome
  - http://localhost:49160/  //it will run
 
 Now for healthcheckup
 - docker-compose up -d
 - docker ps //it will allow us to see the status of the container as healthy
