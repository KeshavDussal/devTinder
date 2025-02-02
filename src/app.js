const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    //Log your error
    res.status(500).send("Something went wrong");
  }
})

app.get("/getUserData", (req, res) => {
  // try {
  //Logic of DB call and get user data
  throw new Error("Error occured");
  res.send("User Data sent")
  // } catch (error) {
  //   res.status(500).send("Some Error Contact support team")
  // }
})
//This is backup error handler when some above error handling fails
app.use("/", (err, req, res, next) => {
  if (err) {
    //Log your error
    res.status(500).send("Something went wrong");
  }
})

app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777...");
});
