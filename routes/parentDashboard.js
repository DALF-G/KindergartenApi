// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

const {auth,authorizeRoles} = require("../middleware/auth")

// get the controller for the parent Dashboard
const ParentDashboard  = require("../controllers/parentDashboardController")

router.get("/",auth,authorizeRoles('parent'),ParentDashboard.getParentDashboard)



module.exports = router;