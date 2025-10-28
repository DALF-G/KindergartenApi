const {User} = require("../models/SchoolDb");
const bycryptjs = require("bcryptjs");



exports.reqisterAdmin = async (req, res)=>{
    // destructure the details passed on the postman
    const {name, email, password, secretkey} = req.body;

    // console.log("The details entered on postman are:",name,email,password,secretkey)
    // verify the admin secret key
    if(secretkey !== process.env.ADMIN_SECRET_KEY){
        return res.status(403).json({message: "Unauthorised Account Creation"});
    }

    // 2. check wheather there is an account with the enterd email
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message: "Sorry, User with this email already exists"});

    }
    // 3.  create an admin User
    // hash the admin password
    const hashedPassword = await bycryptjs.hash(password,10);

    // console.log ("The hashed Admin password is:",hashedPassword)

    const newUser = new User({
        name,
        email,
        role: "admin",
        password:hashedPassword,
        isActive:true,
        teacher: null,
        parent: null
    });

    const savedUser = await newUser.save();

    res.status(201).json({message : "Admin account Created Successfully",savedUser})
};