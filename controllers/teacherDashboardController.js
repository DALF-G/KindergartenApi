const {User,Classroom} = require("../models/SchoolDb")

exports.getTeacherStats = async (req, res)=>{
    try{
        // get the logged in teacher id from the token
        const userId = req.user.userId

        // check whether the teacher exists or not
        const user = await User.findById(userId);
        
        if(!user || !user.teacher){
            return res.status(404).json({message : "Teacher NOT Found"})
        }

        // if the teacher exists, aggregate the classroom to get the total as well as the student total
        const teacherId = user.teacher
        const classStats = await Classroom.aggregate([
            {$match : {teacher: teacherId}},
            {
                $group : {

                    _id : null,
                    totalClasses : {$sum : 1},
                    totalStudents : {$sum : {$size : "$students"}}
                }
            }
        ])

        // return the total results
        const results= {
            totalClasses : classStats[0]?.totalClasses || 0,
            totalStudents : classStats[0]?.totalStudents ||0
        }
        // return the response
        res.json(results)
    }
    catch(err){
        res.status(500).json({message: "Error Fetching Teacher Profile",error: err.message
        })
    }
}