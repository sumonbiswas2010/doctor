require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());
//app.use (bodyParser.json());

app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;
app.listen(port || 3000, () => {
  console.log("server up and running on PORT :", port);
});
