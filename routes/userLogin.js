// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

// import the login controller
const loginController = require("../controllers/loginController");

// define the login route
router.post("/login", loginController.login);

// export the route
module.exports = router;