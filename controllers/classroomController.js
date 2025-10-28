// import the classroom model/object
const {Classroom} = require("../models/SchoolDb")

// =============
// Add a classroom
exports.addClassroom = async (req, res)=>{
    try{
        // destructure the details entered on postman
        const {name, gradeLevel, classYear} = req.body
        // console.log("The inserted classroom details are", name,gradeLevel,classYear)

        // create a new classroom using the request data
        const newClassroom = new Classroom(req.body)

        // save the new classroom inside of the DB
        const savedClassroom = await newClassroom.save()

        // return a response
        res.status(201).json({message : "Classroom Added Successfully", savedClassroom})
    }
    catch(err){
        res.status(400).json({message : "Error Adding a classroom", error: err.message});       
    }
}