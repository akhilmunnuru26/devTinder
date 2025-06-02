const express = require("express");
const app = express()



app.use("/test", (req, res) => {
    res.send("Hello From Test");
});


app.use("/", (req, res) => {
    res.send("Hello From Dashboard");
});




app.listen(7777, () => console.log("Server is running at http://localhost:7777")); 