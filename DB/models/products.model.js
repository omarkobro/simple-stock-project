import mongoose from "mongoose";

let productSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    price:Number
},{
    timestamps:true
})

let Product = mongoose.model("product",productSchema)


export default Product