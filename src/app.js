const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
//Middleware activated for all routes - converting json to js object 
app.use(express.json());

app.post("/signup", async (req, res) => {

  //Creating a new instance of the User Model
  const user = new User(req.body);
  //Handle DB operation always in try catch block
  try {
    //Returns you a promise.
    await user.save();
    res.send("User Added successfully")
  } catch (err) {
    res.status(400).send("Error saving the user:", err.message)
  }

})

connectDB().then(() => {
  console.log("Database connection established....");
  app.listen(7777, () => {
    console.log("Server is succesfully listening on port 7777...");
  });
}).catch(err => {
  console.error("Database cannot be connected!!");

})


