// Below is the schema of the kindergarten database
const mongoose =require("mongoose");

// from mongoose create the schema
const Schema = mongoose.Schema;

// define the user schema
const userSchema = new Schema({
    name: {type : String},
    email: {type : String, required : true, unique : true},
    password: {type : String, required : true},
    isActive: {type : Boolean, default : true},
    role: {type : String, enum : ["admin", "teacher", "parent"], required : true},
    teacher: {type : mongoose.Schema.Types.ObjectId, ref: "Teacher", default : null},
    parent: {type : mongoose.Schema.Types.ObjectId, ref: "Parent", default : null}},{timestamps : true}
    )

// define the teachers Schema 
const teacherSchema = new Schema({
    name: {type : String},
    email: {type : String},
    phone: {type : String},
    subject: {type : String}
}, {timestamps : true})

// define classroom schema
const classroomShema = new Schema({
    name: {type :String, required : true},
    gradeLevel: {type : String},
    classYear: {type : Number},
    teacher: {type : mongoose.Schema.Types.ObjectId, ref: "Teacher", default : null},
    student: {type : mongoose.Schema.Types.ObjectId, ref: "Student", default : null}    
}, {timestamps : true})

// define parents schema
const parentSchema = new Schema({
    name : {type : String, required :true},
    email: {type : String},
    phone: {type : String, required:true},
    nationalId: {type: String, required:true, unique: true},
    address: {type: String},
}, {timestamps : true})

//  define the student shema
const studentShema = new Schema({
    name: {type: String, required : true},
    dateOfBirth: {type: Date, required: true},
    gender: {type: String},
    photo: {type: String},
    admissionNumber: {type: String, unique: true},
    classroom: {type: mongoose.Schema.Types.ObjectId, ref: "Classroom", default : null } ,
    parent: {type: mongoose.Schema.Types.ObjectId, ref: "Parent", default : null}
}, {timestamps: true})

// export them as models
const User = mongoose.model("User", userSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Classroom = mongoose.model("Classroom", classroomShema);
const Parent = mongoose.model("Parent", parentSchema);
const Student = mongoose.model("Student", studentShema);


module.exports = {User,Teacher,Classroom,Parent,Student}


