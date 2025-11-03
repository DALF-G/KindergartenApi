const {Classroom, Teacher, Parent, Student, User} = require("../models/SchoolDb")

// get all the statistics an admin might be interested in:

exports.getDashboardstats = async(req, res)=>{
    try{
        // We can run all the operations in parallel by use of promise
        const[
            totalStudents,
            totalTeachers,
            totalParents,
            totalClassrooms,
            activeUsers
        ] = await Promise.all(
            [Student.countDocuments(),
            Teacher.countDocuments(),
            Parent.countDocuments(),
            Classroom.countDocuments(),
            User.countDocuments({isActive : true})]
        );

        // Admin may also want to get the 5most recent students
        const recentStudents = await Student.find()
        .sort({createdAt : -1})
        .limit(5)

        // Admin may also want to see the recent added teachers
        const recentTeachers = await Teacher.find()
        .sort({createdAt : -1})
        .limit(5)

        // Admin may also want to see the recent added parents
        const recentParents = await Parent.find()
        .sort({createdAt : -1})
        .limit(5)

        // Return all statistics as a single response
        res.json({
            totalStudents,
            totalTeachers,
            totalParents,
            totalClassrooms,
            activeUsers,
            recentStudents,
            recentTeachers,
            recentParents
        })
    }
    catch(err){
        res.status(500).json({message: "Error Loading Admin Contents",error: err.message})
    }
}