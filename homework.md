Create a repository  --> devtinder-backend
Intialize the Repository
node_modules, package.json, package-lock.json
Install express
Create a server
listen to port 7777
write request handlers for /test,/hello
install nodemon and update scripts inside package.json
know the  difference between ^ & ~, .bin in node_modules, package.json vs package-lock.json.
what are the dependenices
what is the use of "-g" while npm install 


///

|- Make your Signup API dynamic to receive data from the user.
|- User.findOne with duplicate emailIds check which Object returned
|- API - GET User by email
|- API - Feed API Get all the users from the database.
|- API - Get User by Id
|- Create a delete User API
|- Difference between Patch Vs Put methods
|- Update User using Patch API
|- Explore Mongoose Documentation for Model Methods
|- Explore what are options in model.findOneAndUpdate method
|- API - Update the User with Email Id
|- Explore schemaType Options from the documentation.
|- Add required, unique, lowercase, min, minLength, trim, default
|- Create Custom validate function for gender
|- Improve the DB Schema - Put all the appropiate validations on each field in schema.
|- Add timestamps to the UserSchema
|- Add API Level Validations on patch request & signup post API
|- Data Sanitizing: Add API Validations for each field
|- Install validator package from NPM Package Library
|- Explore validator library functions and use validator functions for password,email,photoUrl,
|- Never Trust req.body
|- npm i cookie-parser package require('cookie-parser) -> app.use(cookieParser())
|- npm i jsonwebtoken







//User
{
    "firstName": "Diya",
    "lastName": "Sharma",
    "emailId": "diya.sharma1@gmail.com",
    "password": "Diya@123",
    "age": 22,
    "gender": "female",
    "photoUrl": "https://randomuser.me/api/portraits/women/2.jpg",
    "bio": "Aspiring backend engineer learning Node.js.",
    "skills": ["Node.js", "Express", "MongoDB"]
  }

