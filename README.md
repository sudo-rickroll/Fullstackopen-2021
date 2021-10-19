# Phonebook application

## The above application uses ReactJS for Frontend part, NodeJS and ExpressJS for Server-Side code and MongoDB as the Database. It has been setup on heroku in the following URL - http://shrouded-meadow-63118.herokuapp.com/ and can also be run on a local machine.

This is a phonebook application which keeps note of names and phone numbers tht are to be stored. Names and numbers can also be searched in the filter box.

<p align= "center"><img width="600" height="600" src="https://user-images.githubusercontent.com/65642947/137970473-28c60961-e316-49a8-932d-209fc254c343.png?raw=true" alt="phonebook_img"/></p>

To run this application, an account in MongoDB Atlas is required (https://account.mongodb.com/account/login). 

Clone the repo and run `npm install` to install the necessary dependancies from the `package.json` file. It will create a `node_modules` folder with the installed dependancies.

Create a cluster in MongoDB Atlas and use its URL to configure the application to connect to it and provide it to the application as an environment variable (MONGODB_URI), either through the 

`heroku config:set MONGODB_URI <URL to your MongoDB Atlas cluster with proper DB name and password>` 
command if the application is to be deployed and run through heroku 

OR 

create a `.env` file and enter 
`MONGODB_URI = <URL to your MongoDB Atlas cluster with proper DB name and password>`

If configuring as a git repo, make sure to add the `node_modules` folder and the `.env` file in the `.gitignore` file.

To run the application in development mode using nodemon to refresh the server after every code change, run the command `npm run dev`. To run the application in production mode, use `npm start`.

## Miscellaneous -
1. Additional Dependancies - morgan, dotenv, cors, mongoose, mongoose-unique-validator
2. Additional Development Dependancies - eslint, nodemon
