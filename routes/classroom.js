// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

const {auth,authorizeRoles} = require("../middleware/auth")

//  import the classroom login/controller
const classroomController = require("../controllers/classroomController")

// add a new classroom route
router.post("/add",auth,authorizeRoles('admin'), classroomController.addClassroom)



module.exports = router;