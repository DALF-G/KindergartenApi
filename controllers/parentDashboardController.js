const{User,Parent,Student,Classroom} = require("../models/SchoolDb");

// Get Parents Dashboard stats
exports.getParentDashboard = async(req, res)=>{
    try{
        // Get the id of the logged in parent
        const userId = req.user.userId

        // by use of the id, find the parent references and populate the data
        const user = await User.findById(userId)
        .populate('parent')

        // if the user does not exist or is not a parent, return a response
        if(!user || !user.parent){
            return res.status(404).json({message: "Parent profile NOT Found"})
        }

        // if the parent is found return the student they have
        const parent = user.parent

        const children = await Student.find({parent : parent._id})
        .populate('classroom')

        // return the response
        res.json({
            parent,
            children
        })
    }
    catch(err){
        res.status(500).json({message: "Error Fetching Dashboard Contents"})
    }
}