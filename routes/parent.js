// define the admin login routes
const express = require("express");

// from express define the router
const router = express.Router();

const {auth,authorizeRoles} = require("../middleware/auth")

const parentController = require ("../controllers/parentController")


// route to add parent
router.post("/add",auth,authorizeRoles('admin'), parentController.addParent);

// route to fetch all the parents
router.get("/",auth, parentController.getAllParents)

// update a parent details
router.put("/:id",auth,authorizeRoles('admin'),parentController.updateAParent)

// update a parent based on national Id
router.get("/:id", parentController.getParentById)

// Delete a parent
router.delete("/:id",auth,authorizeRoles('admin'),parentController.deleteParentById)


module.exports = router;