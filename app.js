const express = require("express");
const app = express()
const connectDB = require('./src/config/database');

const validator = require("validator");
const cookieParser = require('cookie-parser');
const {validateSignUpData} = require('./src/utils/validation');
const { useAuth } = require('./src/middlewares/auth');   

const User = require('./src/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser());







const port = 7777;

//Signup API



app.post("/signup",async(req,res) => {
    try{
        // validate request body
        validateSignUpData(req.body);
        const {emailId,password} = req.body;

        //Encrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        
        //creating a user instance of the User model
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: emailId,
            password:hashedPassword,
            age: req.body.age,
            gender: req.body.gender,
            photoUrl: req.body.photoUrl,
            bio: req.body.bio,
            skills: req.body.skills
        })

        await user.save();
        res.status(201).json({success: true,message: "User registered successfully"});


        


    }catch(err){
        res.status(400).json({success: false,message: "Error: "+ err.message});
    }
});


//Login API

app.post("/login",async (req,res) => {
    try{
        const {emailId, password} = req.body;
        if(!emailId){
            throw new Error("Email Id is required");
        }
        const user = await User.findOne({emailId:emailId});
        if (!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            throw new Error("Invalid Credentials");
        }
        const token = await jwt.sign({_id: user._id},"dev@Tinder123");
        //set cookie
        res.cookie("token",token);

        // res.cookie("token", "dummy_token_value", {httpOnly: true, secure: true, sameSite: 'Strict'});
        res.status(200).json({success: true, message: "Login Successful"})
    }catch(err){
        res.status(400).json({success:false, message: "Error: "+ err.message});
    }
})


// Profile API - Get User Profile

app.get("/profile",useAuth, async( req, res) => {
    try{
        const {user} = req;
        res.status(200).json({success: true, message: "User profile fetched successfully",data: user});

    }catch(err){
        res.status(400).json({success:false, message: "Error: " + err.message});
    }
})


//FEED API - GET API - Get All the users

app.get("/feed", async (req,res) => {
    const users = User.find({})
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send("Something went wrong")
    }
})


// Get Specific User based on user id
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


connectDB().then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(port,() => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}).catch(() => {
    console.log("Database Connection Failed")
})









