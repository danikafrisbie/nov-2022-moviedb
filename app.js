require("dotenv").config();
const express = require("express");
const app = express();
const token = require("jsonwebtoken");
const cors = require("cors")

// ! Connecting to our user & movie db controllers
const userController = require("./controller/user.controller")
const movieController = require("./controller/movie.controller")

//! Connecting to the mongo database (DB)
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;

db.once("open", ()=> console.log(`connected to the database!`))
app.use(cors());

app.use(express.json());

// ! Direct traffic to specific controllers/paths
app.use("/user", userController)
    // DIRECT ABOVE : We want to direct all traffic incoming to the main page to a route path, and have it handled by a controller w/ instructions for dealing with that route 
app.use("/movie", movieController)

// ! You could add 'validate session' function here, instead of indiviudal controllers. would look like: 
    // app.use(validateSession) 
    // Must also define const at top of page and require our middleware file



app.listen(process.env.PORT, function() {
    console.log(`The movie app is listening on port ${process.env.PORT}`);
})

