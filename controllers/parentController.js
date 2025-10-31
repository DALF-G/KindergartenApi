const{User, Parent, Student} = require("../models/SchoolDb");
const bycryptjs = require("bcryptjs");


// Below is the route to add a parent
exports.addParent = async(req, res)=>{
    try{
        // Destructure the items entered on postman
        const{name, email, phone, nationalId,address} = req.body;
        // console.log("The entered details are:", name,email,phone,subject)

        // 1. check whether the email exists
        const existEmail = await Parent.findOne({email})
        if(existEmail){
            return res.status(400).json({message: "Parent Already Exists."})
        }

        // 2. if the email is not registered, proceed registering the parent
        const newParent = new Parent(req.body)
        const savedParent = await newParent.save() //save to database

        // 3. Create the default password for the Parent
        const parentDefaultPassword = 'parent123'

        // hash the default password
        const hashedPassword = await bycryptjs.hash(parentDefaultPassword,10)

        // note that we need to not only store the details of a teacher into the teachers collection.reason? for the purpose of loggin in
        // below we create a user based on the details passed
        const newUser = new User({
            name : savedParent.name,
            email: savedParent.email,
            password: hashedPassword,
            role : 'parent',
            parent : savedParent._id // this links the teacher collection with the user collection
        })

        // save the new user
        await newUser.save()

        // respond with a message
        res.status(201).json({message: "Parent saved successfully",parent : savedParent})
    }
    catch(err){
        res.status(400).json({message : "Error while adding a Parent",error:err.message})
    }
}

// Get all parents
exports.getAllParents = async(req,res)=>{
    try{
        // fetch all the parents
        const parents = await Parent.find()

        // return a response
        res.json(parents)
    }
    catch(err){
        res.status(400).json({message: "Error fetching Parents", error : err.message})
    }
}

exports.updateAParent = async(req, res)=>{
    try{
        // destructure the request sent
        const{name,password,email,phone,nationalId, ...otherData} = req.body;

        // console.log("The details entered are",name,email,phone,nationalId, ...otherData)

        //  find a parent and update
        const updatedParent = await Parent.findByIdAndUpdate(
            req.params.id,
            {name,password,email,phone,nationalId, ...otherData},
            {new: true}
        )

        if(!updatedParent){
            return res.status(404).json({message: "Parent Not Found"})
        }

        // find the linked user record and update it
        const user = await User.findOne({parent : updatedParent._id})

        if(user){
            // update the name and the email in the users collections as well
            if(name) user.name = name;
            if(email) user.email = email;

            // the same case applies for the password but remeber the  password needs to be hashed
            if(password){
                const hashedPassword = await bycryptjs.hash(password,10)
                user.password = hashedPassword
            }
            // complete the update activity
            await user.save()

            // if it is successfull, return a response
            res.json({
                message:"Parent Details Updated Successfully",updatedParent
            })
        }

    }
    catch(err){
        res.status(400).json({message: "Error updating the Parent", error : err.message})
    }
}

// delete a Teacher by ID
exports.deleteParentById = async (req, res)=>{
    try{
        const parentId = req.params.id
        const deletedParent = await Parent.findByIdAndDelete(parentId)
        if(!deletedParent){
            return res.status(404).json({message: "Parent Not Found"})
        }

        //delete user inside of the user collection in the DB
        await User.findOneAndDelete({parent: parentId}) 

        // unasign the parent from any student
        await Student.updateMany({parent : parentId}, {$set : {parent : null}})
       
        res.status(200).json({message: "Parent Deleted Successfully", deletedParent})
    }
    catch(err){
        res.status(400).json({message: "Error Deleting Parent", error: err.message})
    }
}
