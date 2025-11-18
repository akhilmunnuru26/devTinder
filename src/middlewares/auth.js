
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const useAuth = async (req, res,next) => {
    try{
        const cookies = req.cookies;
        const {token} = cookies;

        if (!token){
            throw new Error("Unauthorized Access: No token provided");
        }

        const decodedMessage = await jwt.verify(token, "dev@Tinder123");
        const {_id} = decodedMessage;
        const user = await User.findById({_id:_id});
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).json({success:false, message: "Error: " + err.message});
    }
}


module.exports = {useAuth};