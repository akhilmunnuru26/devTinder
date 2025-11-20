const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const jwt = require('jsonwebtoken');


const authRouter = express.Router();


// Signup API

authRouter.post("/signup",async(req,res) => {
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


// Login API
authRouter.post("/login",async (req,res) => {
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
});




module.exports = authRouter;