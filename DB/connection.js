import mongoose from "mongoose";

let db_connection = async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/assignment-6')
    .then((res)=>{
        console.log("db connected successfully");
    }).catch((err)=>{
        console.log("db connected faild",err);
    })
}

export default db_connection;