const express = require("express");

const app = express();
//Handle Auth Middleware for all GET,POST,DELETE,PATCH etc
// Middleware - handled only for /admin not for /user
app.use("/admin", (req, res, next) => {
  console.log("Admin Auth checked");

  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("UnAuthorized Request");
  }
  else {
    next();
  }
})

app.get("/user", (req, res) => {
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
