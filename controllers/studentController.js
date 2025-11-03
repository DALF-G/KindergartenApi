const {Student,Parent,Classroom} = require("../models/SchoolDb");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// configure the image upload folder by use of the multer
const upload = multer({dest : "uploads/"})

// export it
exports.uploadStudentPhoto = upload.single('photo');


// Adding/Registering a student
exports.addStudent = async (req, res)=>{
    try{
        // destructure the content sent from postman
        const {name,dateOfBirth,gender,admissionNumber,parentNationalId,classroomId} = req.body;

        // console.log("The enterd details are:",name,dateOfBirth,gender,admissionNumber,parentNationalId,classroomId)

        // 1. check whether there exist any parent with the entered id number
        const parent = await Parent.findOne({nationalId : parentNationalId})
        if(!parent){
            return res.status(404).json({message: "Sorry, parent with the given ID not Found"})
        }
        // 2. check wheather the admission number already exists
        const student = await Student.findOne({admissionNumber})
        if(student){
            return res.status(400).json({message: "Student Alredy exists"})
        }

        // 3. check whether  there is a class with the given class Id
        const classroom = await Classroom.findById(classroomId)
        if(!classroom){
            return res.status(404).json({message: "Classroom does not exist"})
        }

        // 4. handle the photo upload if there is any photo being uploaded
        let photo = null;

        if(req.file){
            const ext = path.extname(req.file.originalname)
            const newFileName = Date.now() + ext;
            const newPath = path.join('uploads', newFileName)
            fs.renameSync(req.file.path,newPath)
            photo = newPath.replace(/\\/g, '/')
        }

        // 5. create a student and save the new student to the Db
        const newStudent = new Student({
            name,
            dateOfBirth,
            gender,
            admissionNumber,
            photo,
            parent: parent._id,
            classroom: classroom._id
        });
        const savedStudent = await newStudent.save()

        // 6. save the student inside of a class
        await Classroom.findByIdAndUpdate(
            classroom._id,
            {$addToSet : {students : savedStudent._id}}
        );

        // if all is a success, return a response
        res.status(210).json({message : "Student Registered Successfully", savedStudent})
    }

    catch(err){
        res.status(400).json({message: "Error Adding a student", error: err.message})
    }
};

// Getting all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('parent classroom', 'name');
        res.status(200).json({ message: "Students fetched successfully", students });
    } 
    catch (err) {
        res.status(400).json({ message: "Error fetching students", error: err.message });
    }
};

// Getting a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id).populate('parent classroom', 'name');

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student fetched successfully", student });
    } 
    catch (err) {
        res.status(400).json({ message: "Error fetching student", error: err.message });
    }
};

// updating a student by ID
exports.updateStudentById = async (req, res) => {
    try {
        // destructure the request sent
        const{name,parent, ...otherData} = req.body;
        // find a student and update
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            {name,parent, ...otherData},
            {new : true}
        );
        if(!updatedStudent){
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } 
    catch (err) {
        res.status(400).json({ message: "Error updating student", error: err.message });
    }
};

// deleting a student by ID
exports.deleteStudentById = async (req, res)=>{
    try{
        const studentId = req.params.id
        const deletedStudent = await Student.findByIdAndDelete(studentId)
        if(!deletedStudent){
            return res.status(404).json({message: "Student Not Found"})
        }
         // unasign the student from any classroom
        await Classroom.updateMany({student : studentId}, {$set : {student : null}})
       
        res.status(200).json({message: "Student Deleted Successfully", deletedStudent})
    }
    catch(err){
        res.status(400).json({message: "Error Deleting Student", error: err.message})
    }
}
