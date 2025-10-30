const {Teacher, User, Classroom} = require("../models/SchoolDb");
const bycryptjs = require("bcryptjs");


// Below is the route to add a teacher
exports.addTeacher = async(req, res)=>{
    try{
        // Destructure the items entered on postman
        const{name, email, phone, subject} = req.body;
        // console.log("The entered details are:", name,email,phone,subject)

        // 1. check whether the email exists
        const existEmail = await Teacher.findOne({email})
        if(existEmail){
            return res.status(400).json({message: "Teacher Already Exists."})
        }

        // 2. if the email is not registered, proceed registering the teacher
        const newTeacher = new Teacher(req.body)
        const savedTeacher = await newTeacher.save() //save to database

        // 3. Create the default password for the teacher
        const teacherDefaultPassword = 'teacher123'

        // hash the default password
        const hashedPassword = await bycryptjs.hash(teacherDefaultPassword,10)

        // note that we need to not only store the details of a teacher into the teachers collection.reason? for the purpose of loggin in
        // below we create a user based on the details passed
        const newUser = new User({
            name : savedTeacher.name,
            email: savedTeacher.email,
            password: hashedPassword,
            role : 'teacher',
            teacher : savedTeacher._id // this links the teacher collection with the user collection
        })

        // save the new user
        await newUser.save()

        // respond with a message
        res.status(201).json({message: "Teacher saved successfully",teacher : savedTeacher})
    }
    catch(err){
        res.status(400).json({message : "Error while adding a Teacher",error:err.message})
    }
}

// Get all teachers
exports.getAllTeachers = async(req,res)=>{
    try{
        // fetch all the teachers
        const teachers = await Teacher.find()

        // return a response
        res.json(teachers)
    }
    catch(err){
        res.status(400).json({message: "Error fetching Teachers", error : err.message})
    }
}
// Get teacher based on an id
exports.getTeacherById = async(req, res)=>{
    try{
        const userId = req.user.userId
    //  console.log("The Id is:", userId)

        // find a user based on the given id
        const user = await User.findById(userId).populate('teacher')
        // console.log("The user is:", user)

        if(!user || !user.teacher){
            return res.status(404).json({message : "Teacher Not found"})
        }

   // if the teacher is there populate also the classess that he do teache
        const teacher = user.teacher
        const teacherId = teacher._id

        const classrooms = await Classroom.find({teacher: teacherId}).populate
        ('student', 'name admissionNumber')

        // return the response
        res.json({teacher, classrooms})


    }
    catch(err){
         res.status(400).json({message: "Error fetching the Teachers", error : err.message})
    }
}

// delete a Teacher by ID
exports.deleteTeacherById = async (req, res)=>{
    try{
        const {id} = req.params
        const deletedTeacher = await Teacher.findByIdAndDelete(id)
        if(!deletedTeacher){
            return res.status(404).json({message: "Teacher Not Found"})
        }
        res.status(200).json({message: "Teacher Deleted Successfully", deletedTeacher})
    }
    catch(err){
        res.status(400).json({message: "Error Deleting Teacher", error: err.message})
    }
}