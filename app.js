const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const cors = require("cors")


// create an express application
const app = express();

// allow the application to use json
app.use(express.json())
app.use(cors())

// specify the adminRegister route
const adminRegisterRoute = require("./routes/adminRegister");
app.use("/api/admin", adminRegisterRoute)

// specify the login routes
const loginRoutes = require("./routes/userLogin")
app.use("/api/user",loginRoutes);

// specify the classroom routes
const classroomRoutes = require("./routes/classroom")
app.use("/api/classroom",classroomRoutes)

// connect the application to mongodb
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongo Database connected successfully")).catch(err=> console.error("Error connecting to Database"));


const PORT = 3000;

app.listen(PORT,()=>{
    console.log("The server is running on port 3000...")
})