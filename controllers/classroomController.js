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

// Get all classrooms
exports.getAllClassrooms = async (req, res)=>{
    try{
        const classrooms = await Classroom.find()
        res.status(200).json({message: "Classrooms Retrieved Successfully", classrooms})
    }
    catch(err){
        res.status(400).json({message: "Error Retrieving Classrooms", error: err.message})
    }
}

// Get a single classroom by ID
exports.getClassroomById = async (req, res)=>{
    try{
        const {id} = req.params
        const classroom = await Classroom.findById(id)
        if(!classroom){
            return res.status(404).json({message: "Classroom Not Found"})
        }
        res.status(200).json({message: "Classroom Retrieved Successfully", classroom})
    }
    catch(err){
        res.status(400).json({message: "Error Retrieving Classroom", error: err.message})
    }
}

// delete a classroom by ID
exports.deleteClassroomById = async (req, res)=>{
    try{
        const {id} = req.params
        const deletedClassroom = await Classroom.findByIdAndDelete(id)
        if(!deletedClassroom){
            return res.status(404).json({message: "Classroom Not Found"})
        }
        res.status(200).json({message: "Classroom Deleted Successfully", deletedClassroom})
    }
    catch(err){
        res.status(400).json({message: "Error Deleting Classroom", error: err.message})
    }
}