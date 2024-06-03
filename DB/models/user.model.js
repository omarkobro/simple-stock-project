import mongoose from "mongoose";

let userSchema  = new mongoose.Schema({
    userName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female'],
        default: "male"
    },
    age:Number,
    phone:String
},{
    timestamps:true
})

let User = mongoose.model("user",userSchema)


export default User