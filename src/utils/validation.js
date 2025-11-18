const validator = require("validator");

const validateSignUpData = (data) => {
    const {emailId,password,firstName,lastName} = data;

    if (!firstName || typeof firstName !== "string" || firstName.trim().length < 4 || firstName.trim().length > 50 || !/^[A-Za-z\s]+$/.test(firstName)){
        throw new Error("First name must be a string between 3 and 50 characters long and contain only");
    }else if (lastName && (typeof lastName !== "string" || lastName.trim().length < 3 || lastName.trim().length > 50 || !/^[A-Za-z\s]+$/.test(lastName))){
        throw new Error("Last name must be a string between 3 and 50 characters long and contain only alphabets");
    }else if (validator.isEmail(emailId) === false){
        throw new Error("Invalid email address format");
    }else if(!validator.isStrongPassword(password,{
        minLength:8,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1
    })){
        throw new Error("Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols");
    }

}

module.exports = {validateSignUpData};