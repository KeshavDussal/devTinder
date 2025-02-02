const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namastedev:123@namastenode.s8p19.mongodb.net/devTinder?retryWrites=true&w=majority&appName=NamasteNode");
}

module.exports = connectDB;