const express = require("express");

const app = express();
//function inside use is known as request handler
app.use("/", (req, res) => {
  res.send("Namaste from the Dashboard!");
});
app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello Hello!");
});
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777...");
});
