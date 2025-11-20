const express = require("express");
const {useAuth} = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile",useAuth, async( req, res) => {
    try{
        const {user} = req;
        res.status(200).json({success: true, message: "User profile fetched successfully",data: user});

    }catch(err){
        res.status(400).json({success:false, message: "Error: " + err.message});
    }
})

module.exports = profileRouter;