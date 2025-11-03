const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const cors = require("cors")


// create an express application
const app = express();

// allow the application to use json
app.use(express.json())
app.use(cors())

// specify the upload folder for your file to make them accessible when it get hosted
app.use('/uploads',express.static('uploads'))

// specify the adminRegister route
const adminRegisterRoute = require("./routes/adminRegister");
app.use("/api/admin", adminRegisterRoute)

// specify the login routes
const loginRoutes = require("./routes/userLogin")
app.use("/api/user",loginRoutes);

// specify the classroom routes
const classroomRoutes = require("./routes/classroom")
app.use("/api/classroom",classroomRoutes)

//  specify the route for accessing a teacher
const teacherRoutes = require("./routes/teacher")
    app.use("/api/teacher",teacherRoutes)

// specify the routes for accessing a parent
const parentRoutes = require("./routes/parent")
app.use("/api/parent",parentRoutes)   

// specify the students route
const studentRoutes = require("./routes/student")
app.use("/api/student",studentRoutes)

// define the route to get admin dashboard starts
const adminDashboardRoutes = require("./routes/adminDashboard")
app.use("/api/adminstats",adminDashboardRoutes) 

// define the routes to get parent dashboard stats
const parentDashboardRoutes = require("./routes/parentDashboard")
app.use("/api/parentstats",parentDashboardRoutes)

//  Define the route to get the teacher dashboard stats
const teacherDashboardRoutes = require("./routes/teacherDashboard")
app.use("/api/teacherstats",teacherDashboardRoutes)


// connect the application to mongodb
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongo Database connected successfully")).catch(err=> console.error("Error connecting to Database"));


const PORT = 3000;

app.listen(PORT,()=>{
    console.log("The server is running on port 3000...")
})