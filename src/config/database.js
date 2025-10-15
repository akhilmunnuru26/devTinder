const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://munnuruakhil26:munnuruakhil26@cluster0.jbbiw4q.mongodb.net/devTinder");
}


module.exports = connectDB