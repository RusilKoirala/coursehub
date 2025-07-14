import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
    },
    password : {
        type : String,
        required : true,
    },
    pfp : {
        type : String,
        default: "",
    },
    role : {
        type : String,
        enum: ["User", "Admin"],
        default : "User"
    },
    enrolledCourses : [
        {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Course", // link to Course model
    },
    ]
} ,{timestamps : true}
)

const User = mongoose.model("User",  UserSchema)
export default User;
