const mongoose = require("mongoose");
const validator = require("validator");


const ALLOWED_GENDERS = ["male","female","others"]

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type: String,
        required: true,
        minLength: [3,"First name must be at least 3 characters long"],
        maxLength: [50,"First name cannot exceed 50 characters"],
        trim:true,
        match: [/^[A-Za-z\s]+$/, "First name must contain only alphabets"]
    },
    lastName:{
        type:String,
        minLength: [3,"Last name must be at least 3 characters long"],
        maxLength: [50,"Last name must be at least 3 characters long"],
        trim: true,
        match: [/^[A-Za-z\s]+$/, "Last name must contain only alphabets"]
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
        // validate(value){
        //     const isValidEmail = validator.isEmail(value)
        //     if (!isValidEmail){
        //         throw new Error("");
        //     }
        // },
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Invalid email address format"
        }

    },
    password: {
        type:String,
        required: true,
        // validate(value){
        //     const isValidPassword=validator.isStrongPassword(value);
        //     if (!isValidPassword){
        //         throw new Error()
        //     }
        // }
        validate: {
            validator: (value) => validator.isStrongPassword(value,{
                minLength:8,
                minUppercase:1,
                minLowercase:1,
                minNumbers:1,
                minSymbols:1
            }),
            message: "Password must include uppercase, lowercase, number, and symbol with at least 8 characters"
        }
    },
    age: {
        type:Number,
        required: [true,"Age is required"],
        min: [18,"You must be at least 18 years old"],

    },
    gender: {
        type: String,
        required: [true,"Gender is required"],
        // validate(value) {
        //    if([!"male","female","others"].includes(value)){
        //         throw new Error("Gender data is not valid")
        //    } 
        // },
        enum: {
            values: ALLOWED_GENDERS,
            message: "Gender must be either male, female, or others"
        } 
    },
    photoUrl: {
        type: String,
        default: "https://imgs.search.brave.com/_xa-9DpUwAMeOS95RlsedIc3gvNOQ1A3wRMyGMRctrc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzU0LzM0LzEw/LzM2MF9GXzE1NTQz/NDEwOTlfbUdBM2lZ/TVlzc05ZYXhXQ09z/TFNJZFdCRlY3SUli/SWIuanBn",
        // validate(value){
        //     const isValidPhotoUrl = validator.isURL(value);
        //     if (!isValidPhotoUrl){
        //         throw new Error("");
        //     }
        // }
        validate: {
            validator: (value) => validator.isURL(value),
            message: "Invalid photo URL"
        }
    },
    bio: {
        type: String,
        default: "This is the default nio of the user",
        maxLength: [300,"Bio cannot exceed 300 characters"],
        trim: true
    },
    skills:{
        type: [String],
        default:[],
        validate: {
            validator: (value) => Array.isArray(value) && value.length <= 10,
            message: "You can add a maximum of 10 skills"
        }
        
    }
},{timestamps:true}
)



// Pre-save hook for sanitization
userSchema.pre("save",function(next){
    if(this.bio) this.bio = validator.escape(this.bio) //prevents XSS attacks
    next()
})

// Hide sensitive fields in JSON responses
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password; // hide password
    return ret;
  },
});

// Virtual field for full name

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName || ""}`.trim();
});




// Schema Methods

userSchema.methods.getJwt = function(){

}


const User = mongoose.model("User",userSchema);
module.exports = User




// Feature	 Purpose	When It Runs	Example Use Case
// enum	     Restricts allowed values	During validation	gender, status, role
// pre()	 Runs before certain actions	Before save, update, etc.	Hash passwords, sanitize fields
// set()	 Modifies how documents behave	During conversion to JSON/Object	Hide passwords, transform output
// virtual() Creates computed fields	When document is accessed	fullName, age, summary