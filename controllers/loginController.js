const {User} = require("../models/SchoolDb");
const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import jwt secret
const JWT_SECRET = process.env.JWT_SECRET;

// create a function to handle the login operation
exports.login = async(req, res)=>{
    try{
        // destructure the details entered on postman
        const {email, password} = req.body;

        // chech whether you are able to receive the data
        // console.log("The entered details are:",email,password)

        // 1. find user based on given email
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(404).json({message:"Sorry, Email does NOT Exist..."})
        }
        // 2. check wheather account is active or not
        if(!userExist.isActive){
            return res.status(403).json({message: "Your account is not Active.."})
        }
        // 3. compare the provided password with the hashed password in the MongoDB
        const isMatch = await bycryptjs.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({message : "Invalid password please try Again."})
        }
        // 4. Generate JWT token used for session management purpose
        const token = jwt.sign(
            {userId : userExist._id, role :userExist.role},
            JWT_SECRET,
            {expiresIn : "1h"}
        );
        // console.log("The generate login token is:",token)

        // 5. send a success message when successfully logged in
        res.json({
            message : "Login successful",
            token,
            user :({
                id : userExist._id,
                name : userExist.name,
                email : userExist.email,
                role : userExist.role

            })
        })
    }
    catch(err){
        res.status(500).json({message: "Login failed",error: err.message});
        
    }
}