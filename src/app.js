const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
//Handle Auth Middleware for all GET,POST,DELETE,PATCH etc
// Middleware - handled only for /admin not for /user
app.use("/admin", adminAuth)

app.post("/user/login", (req, res) => {
  res.send("User Logged in Successfully")
})

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data sent")
})

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent")
})

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user")
})
app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777...");
});
