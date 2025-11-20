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

app.get("/user",  async (req,res) => {
    const userId = req.body.userId
    
    try{
         const user = await User.findById({ _id:userId })
         if (!user){
            res.status(404).send("User not found")
         }else{
            res.send(user)
         }
         

    }catch(e){
         res.status(500).send("Something went wrong")
    }
   
})

//Get Specific User based on user email
// app.get("/user",  async (req,res) => {
//     const userEmail = req.body.emailId
//     console.log("Email Id",userEmail)
  
//     try{
//          const user = await User.findById({ emailId: userEmail })
//          if (!user){
//             res.status(404).send("User not found")
//          }else{
//             res.send(user)
//          }
         

//     }catch(e){
//          res.status(500).send("Something went wrong")
//     }
   
// })



// Delete User


app.delete("/user", async(req,res) => {
    try{
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete({ _id: userId});
        res.send("User Deleted Successfully");
    }catch(e){
        res.status(500).send("Something went wrong")
    }
})


//API-Patch:  Update User

app.patch("/user/:userId", async(req,res) => {
    try{
        const userId = req.params?.userId;
        const data = req.body

        const ALLOWED_UPDATES = ["photoUrl","bio","skills","gender"];
        const is_allowed_updates = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));

        if (!is_allowed_updates){
            throw new Error("Update not allowed");
        }

        if(data?.skills.length > 10){
            throw new Error("Cannot add skills more than 10");
        }

        await User.findByIdAndUpdate({ _id: userId}, userObj,{returnDocument: "after",runValidators:true});
        res.send("User updated Successfully");

    }catch(e){
        res.status(500).send("Update failed: " + e.message);
    }
})



// update user by email

// app.patch("/user/:userId", async(req,res) => {
//     try{
//         const userEmail = req.body.emailId;
//         const userObj = req.body;
//         const ALLOWED_UPDATES = ["photoUrl","bio","skills","gender"];
//         const is_allowed_updates = Object.keys(userObj).every((key) => ALLOWED_UPDATES.includes(key));
//         if (!is_allowed_updates){
//             throw new Error("Update not allowed");
//         }
//         if (userObj?.skills > 10){
//             throw new Error("Skills cannot be more than 10");
//         }
//         console.log("Patch by Email",userEmail,userObj);
//         const user = await User.findOneAndUpdate({ emailId: userEmail}, userObj, {returnDocument: "after",runValidators:true});
//        res.send(user)
//     }catch(err){
//        res.status(500).send("Update failed: "+ err.message); 
//     }
// })

app.get("/feed", async (req,res) => {
    const users = User.find({})
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send("Something went wrong")
    }
})

