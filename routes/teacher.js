// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

const {auth,authorizeRoles} = require("../middleware/auth")

//  import the classroom login/controller
const teacherController = require("../controllers/teacherController")

// route to add teacher
router.post("/add",auth,authorizeRoles('admin'), teacherController.addTeacher);

// route to fetch all the teachers
router.get("/",auth, teacherController.getAllTeachers)

// get teacher based on id
router.get("/:id",auth, teacherController.getTeacherById)

// Delete a techer
router.delete("/:id",auth,authorizeRoles('admin'),teacherController.deleteTeacherById)


module.exports = router;