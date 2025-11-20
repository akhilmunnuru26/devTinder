const express = require("express");
const app = express()
const connectDB = require('./src/config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/auth'); 
const profileRouter = require('./src/routes/profile');
const requestRouter = require('./src/routes/request');





app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


const port = 7777;





connectDB().then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(port,() => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}).catch(() => {
    console.log("Database Connection Failed")
})









