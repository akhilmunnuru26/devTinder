const express = require("express");
const app = express()
const connectDB = require('./src/config/database')
const port = 7777;

connectDB().then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(port,() => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}).catch(() => {
    console.log("Database Connection Failed")
})









