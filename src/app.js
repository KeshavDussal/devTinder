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
    res.status(400).send(`Error saving the user: ${err.message}`);
  }

})

// Get User by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail })
    if (!user) {
      res.status(404).send("User not found")
    }
    else {
      res.send(user)
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }

})

app.get("/feed", async (req, res) => {
  try {
    //{} - This is filter and we have not mentioned anything to be filtered so all documents will be returned back with this. 
    const users = await User.find({})
    if (users.length === 0) {
      res.status(404).send("Users not found")
    }
    else {
      res.send(users)
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
})
//Delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId })
    //const user = await User.findByIdAndDelete(userId)
    res.send("User deleted successfully")
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
})

//Update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true
    })
    console.log("user", user)
    res.send("User updated successfully")
  } catch (error) {
    res.status(400).send("Updated failed:" + error.message);
  }
})

// Update data of the by using emailId
// app.patch("/user", async (req, res) => {
//   const emailId = req.body.emailId;
//   const data = req.body;
//   console.log(emailId, data);

//   try {
//     const user = await User.findOneAndUpdate({ emailId: emailId }, data)
//     console.log("user", user)
//     res.send("User updated successfully")
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// })

connectDB().then(() => {
  console.log("Database connection established....");
  app.listen(7777, () => {
    console.log("Server is succesfully listening on port 7777...");
  });
}).catch(err => {
  console.error("Database cannot be connected!!");

})


