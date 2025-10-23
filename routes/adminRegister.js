// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

// import the admin register controller / logic
const registerController = require("../controllers/adminRegisterController");

// define the endpoint to access for you to register an admin
router.post("/register", registerController.reqisterAdmin)

// export the router
module.exports = router;