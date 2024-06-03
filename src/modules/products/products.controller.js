
import Product from "../../../DB/models/products.model.js";
import User from "../../../DB/models/user.model.js";

// ========================add product ==========================
export let addProduct = async (req,res)=>{

    try {
        let {name,description,userId,price} = req.body
        let newProduct = await Product.create({name,description,userId,price})
        let checkUser = await User.findById(userId) 
        if(!checkUser){
            return res.json({
                message:"Invalid User ID",
            })
        }

            res.json({
                message:"added successfully",
                newProduct  
        }) 
    } catch (error) {
        res.json({
            message:"error",
            error  
        }) 
    }
}


// ========================delete product ==========================
export let deleteProduct = async (req,res)=>{

    try {
        let {_id} = req.params
        let {userId} = req.body
        let checkProduct = await Product.findById(_id)
        if(checkProduct.userId.toString() != userId.toString()){
            return res.json({
                message: 'Unauthorized to take this action',
            })
        }
        if (!checkProduct) {
            return res.json({
                message: 'product Does not exist',
            })
        }

        let product = await Product.findByIdAndDelete(_id)

        res.json({
            message: 'deleted successfully',
            product
        })
    } catch (error) {
        res.json({
            message:"error",
            error  
        }) 
    }
}

// ======================== Update product ==========================

export let updateProduct = async(req,res)=>{
    let {name,price,description} = req.body
    let {_id} = req.params
    let {userId} = req.body
    // let product = await Product.findByIdAndUpdate(_id,{name,price,description},{new:true})
    let checkProduct = await Product.findById(_id)
    if(checkProduct.userId.toString() != userId.toString()){
        return res.json({
            message: 'Unauthorized to take this action',
        })
    }
    if (!checkProduct) {
        return res.json({
            message: 'Failed to update product',
        })
    }
    
    let product = await Product.findByIdAndUpdate(_id,{name,price,description},{new:true})
    res.json({
        message: 'User Updated successfully',
        product
    })
} 


// ======================== list all products with their owner's info==========================

export let  listAllProductsWithTheirUsersInfo = async (req,res)=>{
    let products = await Product.find().populate([{path: "userId", select:"-password"}])
    res.json({
        message:"done",
        products
    })
}



// ========================sort Products==========================

export let sortProducts = async (req,res)=>{
    let products = await Product.find().sort('-createdAt')

    res.json({
        message:"done",
        products
    })
}