# FeatureFlags
Feature flags services

# Development Setup

1. Install Git, Yarn
2. Install mongoDB (for local instance), Robomongo
    https://treehouse.github.io/installation-guides/mac/mongo-mac.html
    
3. Clone this repo to your local working folder 

4. Make sure localinstance of MondoDB is running
   * On terminal 1, run Mongo daemon using command `mongod`. 
   * On terminal 2, run Mongo shell using command `mongo`. Mongo shell is an application to access data in MongoDB.
5. Install and open RoboMongo, create a local connection and start a new databse `feature-flags` on local connection.
6. Open the project folder (where GIT REPO is cloned) on terminal and run below commands
  * `yarn install`
  * `yarn run start-dev` on terminal 3 - this runs webpack in watch mode
  * `yarn run dev` on terminal 4 - this starts node server in nodemon mode
  
7. If everything goes well, test the API from POSTMAN



