const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const cookieParser = require("cookie-parser")
//Middleware activated for all routes - converting json to js object 
app.use(express.json());
app.use(cookieParser());
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt")
const { userAuth } = require("./middlewares/auth")

app.post("/signup", async (req, res) => {
  //Handle DB operation always in try catch block
  try {
    //Validation of Data
    validateSignUpData(req)
    const { firstName, lastName, emailId, password } = req.body
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10)

    //Creating a new instance of the User Model
    const user = new User({
      firstName, lastName, emailId, password: passwordHash
    });
    //Returns you a promise.
    await user.save();
    res.send("User Added successfully")
  } catch (err) {
    res.status(400).send(`Error saving the user: ${err.message}`);
  }

})

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId })
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create a JWT token
      const token = await user.getJWT();
      //Add the token to cookie and send the response back to the user.
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000) // cookie will be removed after 8 hours
      });
      res.send("Login Successfull!!!")
    }
    else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
})

app.get("/profile", userAuth, async (req, res) => {
  console.log("req.user" + req.user)
  try {
    const user = req.user;

    res.send(user)
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }

})
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  //Sending a connection request
  console.log("Sending a connection request");
  res.send(user.firstName + " sent the connection request!")
})
connectDB().then(() => {
  console.log("Database connection established....");
  app.listen(7777, () => {
    console.log("Server is succesfully listening on port 7777...");
  });
}).catch(err => {
  console.error("Database cannot be connected!!");

})


