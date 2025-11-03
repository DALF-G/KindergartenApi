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
        .populate('teacher', 'name email phone')
        .populate('students', 'name admissionNumber')

        res.status(200).json({classrooms})
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
        .populate('teacher', 'name email phone')
        .populate('students', 'name admissionNumber')
        if(!classroom){
            return res.status(404).json({message: "Classroom Not Found"})
        }
        res.status(200).json({classroom})
    }
    catch(err){
        res.status(400).json({message: "Error Retrieving Classroom", error: err.message})
    }
}

// Below is the update route
exports.updateAClass = async (req, res) => {
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("teacher", "name email phone")
      .populate("students", "name admissionNumber");

    if (!updatedClassroom) {
      return res.status(404).json({ message: "Classroom NOT Found" });
    }

    res.status(200).json({ message: "Classroom Updated Successfully", updatedClassroom });
  } catch (err) {
    res.status(400).json({ message: "Error Updating Classroom", error: err.message });
  }
};

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