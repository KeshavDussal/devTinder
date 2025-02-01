const express = require("express");

const app = express();

app.get("/admin/getAllData", (req, res) => {
  //Logic of checking authentication/authorized
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    //res.send - default status is 200
    res.send("All data sent")
  }
  else {
    //res.status - changing the default status to mentioned status
    res.status(401).send("UnAuthorized Request");
  }
})

app.get("/admin/deleteUser", (req, res) => {
  //Logic of checking authentication/authorized
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    //res.send - default status is 200
    res.send("Deleted a user")
  }
  else {
    //res.status - changing the default status to mentioned status
    res.status(401).send("UnAuthorized Request");
  }
})
app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777...");
});
