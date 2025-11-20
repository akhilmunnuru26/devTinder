const express = require('express');
const {useAuth} = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/request",useAuth,async(req,res) => {
    const user = req.user;
    console.log("Connection request sent");
    res.send("Connection request sent");
});



module.exports = requestRouter




