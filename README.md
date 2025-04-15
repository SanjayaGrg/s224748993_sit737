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


### TASK 5.2D COMMANDS

 > For creating the image and container
  ```
  docker compose up  
  ```  

  > For checking the image if created or not
  ```
  docker images
  ```

  > List of gcloud projects
  ```
  gcloud projects list
  ```

  > Setup of gcloud project
  ```
   gcloud config set project sit737-25t1-gurung-c1cd429
  ```
  
  > Enable gcloud Artifact Registry
  ```
  gcloud services enable artifactregistry.googleapis.com
  ```

  > Tagging my docker image for gcloud with my repo name and the docker image name
  ```
  docker tag sit737-2025-prac5d-web us-central1-docker.pkg.dev/sit737-25t1-gurung-c1cd429/converter-microservice/sit737-2025-prac5d-web:v1
  ```

  > Pushing my docker image for gcloud with my repo name and the docker image name
  ```
  docker push us-central1-docker.pkg.dev/sit737-25t1-gurung-c1cd429/converter-microservice/sit737-2025-prac5d-web:v1
  ```

  > Running my docker image from gcloud with my image name
  ```
  docker run -p 8080:8080 us-central1-docker.pkg.dev/sit737-25t1-gurung-c1cd429/converter-microservice/sit737-2025-prac5d-web:v1
  ```


### TASK 6.1P COMMANDS

  > Build docker image and container
  ```
    docker build -t unit-converter-app .
    docker tag unit-converter-app s224748993/unit-converter-app:latest
    docker push s224748993/unit-converter-app:latest
  ```  

  > Create kubernetes deployment and service yaml file and apply config
  ```
  kubectl apply -f deployment.yaml
  kubectl apply -f service.yaml
  ```

  > checking the deployment
  ```
  kubectl get deployments
  kubectl get pods
  kubectl get services
  ```

  > Start the kubernetes dashboard
  ```
   kubectl proxy
  ```
  
  > To get access for the token, use this command:
  ```
  kubectl -n kubernetes-dashboard create token admin-user
  ```

### TASK 6.2C COMMANDS
  #### Part 1 : Interacting with kubernetes cluster
  > Check application status (pods and services)
  ```
    kubectl get pods
    kubectl get services
  ```  

  > Access web application using port forwarding 
  ```
  kubectl port-forward service/unit-converter-service 3000:3000
  ```

   > Start the kubernetes dashboard
  ```
   kubectl proxy
  ```
  
  > To get access for the token, use this command:
  ```
  kubectl -n kubernetes-dashboard create token admin-user
  ```

#### Part 2 : Updating Application
  > checking in server.js
  > Build and tag new docker Image
  ```
  docker build -t unit-converter-app:v2 .
  docker push yourusername/unit-converter-app:v2
  ```

  > Updating kubernetes deployment yaml file
  ```
  containers:
  - name: unit-converter
    image: unit-converter-app:v2 # changing here latest to v2
  ```

  > Applying changes in kubernetes deployment 
  ```
  kubectl apply -f deployment.yaml
  ```

  > Verifying rollout and check the new pods available or not
  ```
  kubectl rollout status deployment/unit-converter-deployment
  kubectl get pods 
  ```
  > check the kubernetes dashboard for the changes and also run in the localhost server

 