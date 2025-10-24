const express = require("express");
const app = express()
const connectDB = require('./src/config/database')
const User = require('./src/models/user');
app.use(express.json());




const port = 7777;

//Signup API



app.post("/signup", async (req,res) => {
    // Create an Instance and save the data in the database as documents
    console.log("Req Body",req.body)
    const user = new User(req.body)
    try{
        await user.save()
        res.send("User created successfully");
    }catch(err){
        console.log("Error while Saving the data in database");
        res.send(err.message)
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









