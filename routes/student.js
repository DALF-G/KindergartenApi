// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

const {auth,authorizeRoles} = require("../middleware/auth")

// import the student controller
const studentController = require("../controllers/studentController")

const upload = require("../middlewares/upload")


// below is the route to add a student
// router.post("/add",studentController.uploadStudentPhoto, studentController.addStudent)

router.post('/', auth, (req, res, next) => {
    console.log('📥 POST / route hit');
    next();
  }, upload.single('photo'), (req, res, next) => {
    console.log('📷 File middleware passed');
    next();
  }, studentController.addStudent);

// below is the route to get all students
router.get("/", studentController.getAllStudents);

// below is the route to get a single student by ID
router.get("/:id", studentController.getStudentById);

// below is the route to update a student by ID
router.put("/:id",studentController.uploadStudentPhoto, studentController.updateStudentById);

// below is the route to delete a student by ID
router.delete("/:id", studentController.deleteStudentById);

module.exports = router;