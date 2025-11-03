// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

const {auth,authorizeRoles} = require("../middleware/auth")

// import the teacher dashboard controller
const teacherDashboardController = require("../controllers/teacherDashboardController")

// get all the teacher statistics
router.get("/",auth,authorizeRoles("teacher"),teacherDashboardController.getTeacherStats)


// export the router
module.exports = router;