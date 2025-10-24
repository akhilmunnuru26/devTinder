const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    lastName:{
        type:String,
        minLength: 3,
        maxLength: 50,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
//         match: [
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     "Please enter a valid email address"
//   ],
        validate(value){
            const isValidEmail = validator.isEmail(value)
            if (!isValidEmail){
                throw new Error("");
            }
        }      
    },
    password: {
        type:String,
        required: true,
        validate(value){
            const isValidPassword=validator.isStrongPassword(value);
            if (!isValidPassword){
                throw new Error()
            }
        }
    },
    age: {
        type:Number,
        required: true,
        min: 18,
    },
    gender: {
        type: String,
        required: true,
        validate(value) {
           if([!"male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
           } 
        } 
    },
    photoUrl: {
        type: String,
        default: "https://imgs.search.brave.com/_xa-9DpUwAMeOS95RlsedIc3gvNOQ1A3wRMyGMRctrc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzU0LzM0LzEw/LzM2MF9GXzE1NTQz/NDEwOTlfbUdBM2lZ/TVlzc05ZYXhXQ09z/TFNJZFdCRlY3SUli/SWIuanBn",
        validate(value){
            const isValidPhotoUrl = validator.isURL(value);
            if (!isValidPhotoUrl){
                throw new Error("");
            }
        }
    },
    bio: {
        type: String,
        default: "This is the default nio of the user"
    },
    skills:{
        type: [String],
        
    }
},{timestamps:true}
)

const User = mongoose.model("User",userSchema);
module.exports = User