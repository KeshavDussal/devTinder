const express = require("express");

const app = express();
//function inside use is known as request handler
app.use("/user", (req, res) => {
  res.send("HAHAHAHAHH");
});

//But below will only handle get API calls.
app.get("/user", (req, res) => {
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

app.post("/user", (req, res) => {
  //Saving data to DB
  res.send("Data Successfully saved to the database");
});

app.delete("/user", (req, res) => {
  //Saving data to DB
  res.send("Deleted Successfully");
});

//if you "use" This will match all the http method API calls to the /test.
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777...");
});
