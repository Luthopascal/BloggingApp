// all routes are defined here
const express = require("express");

//const {register} = require("../Controllers/authController");
const { registerUser, loginUser } = require("../../Controllers/authController"); // Import the register function from the authController

const router = express.Router(); // Create a new router object

router.post("/register", registerUser)  // Define a POST route for user registration

router.post("/login",loginUser)  // Define a POST route for user login (functionality to be implemented)



module.exports = router; // Export the router to be used in other parts of the application