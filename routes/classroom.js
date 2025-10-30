// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

const {auth,authorizeRoles} = require("../middleware/auth")

//  import the classroom login/controller
const classroomController = require("../controllers/classroomController")

// add a new classroom route
router.post("/add",auth,authorizeRoles('admin'), classroomController.addClassroom)

// get all classrooms route
router.get("/",auth, classroomController.getAllClassrooms)

// get a single classroom by ID route
router.get("/:id",auth, classroomController.getClassroomById)

// update a classroom details
router.put("/:id",auth,authorizeRoles('admin'),classroomController.updateAClass)


// delete a classroom by ID route
router.delete("/:id",auth,authorizeRoles('admin'), classroomController.deleteClassroomById)

module.exports = router;