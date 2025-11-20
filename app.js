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


connectDB().then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(port,() => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}).catch(() => {
    console.log("Database Connection Failed")
})









