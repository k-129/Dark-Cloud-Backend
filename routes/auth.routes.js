const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;


router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  // Check if username or password are provided as empty string
  if (username === "") {
    res.status(400).json({ message: "Provide username." });
    return;
  } else if (password === "") {
    res.status(400).json({ message: "Provide password." });
    return;
  }

  // Check the users collection if a user with the same username exists
  User.findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, username, isAdmin } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, username, isAdmin };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({
          message: "Wrong Password!",
        });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});



// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
