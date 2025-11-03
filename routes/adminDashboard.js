// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

const {auth,authorizeRoles} = require("../middleware/auth")

// import the admin dashboard controller
const adminDashboardController = require("../controllers/adminDashboardController")

// get all the admin statistics
router.get("/",auth,authorizeRoles("admin"),adminDashboardController.getDashboardstats)


// export the router
module.exports = router;
