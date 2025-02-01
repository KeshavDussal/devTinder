const express = require("express");

const app = express();

//But below will only handle get API calls.
app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user");
    next(); //Next goes to next response handler and you will see 2nd Response as output.
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    //res.send("2nd Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3");
    //res.send("3rd Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4");
    //res.send("4th Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4");
    res.send("5th Response!!");
  }
);

app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777...");
});
