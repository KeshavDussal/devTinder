const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namastedev:tg53T0tr8lySwU6i@namastenode.s8p19.mongodb.net/devTinder?retryWrites=true&w=majority&appName=NamasteNode");
}

module.exports = connectDB;