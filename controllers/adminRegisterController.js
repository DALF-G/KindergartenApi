const {User} = require("../models/SchoolDb");
const bycryptjs = require("bcryptjs");



exports.reqisterAdmin = async (req, res)=>{
    // destructure the details passed on the postman
    const {name, email, password, secretkey} = req.body;

    console.log("The details entered on postman are:",name,email,password,secretkey)
}