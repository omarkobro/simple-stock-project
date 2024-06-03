import Product from "../../../DB/models/products.model.js";
import User from "../../../DB/models/user.model.js";




// ======================== get all users ==========================
export let listUsers = async (req,res)=>{
    let data = await User.find()
    res.json({
        message: "done",
        data
    })
}

// ======================== signUp ==========================

export let signUp = async(req,res)=>{
    let {userName, email,password, age,gender} = req.body
    let userCheck = await User.findOne({
        email
    })

    if(userCheck){
        res.json({
            message: "email already exists.. Try Another one",
        })
    }
    else{
        let createUser = await User.create({userName, email,password, age,gender})
        res.json({
            message: "done",
            createUser
        })
    }
} 

// ======================== signIn ==========================

export let signin = async(req,res)=>{
    let {email,password} = req.body
    let logIn = await User.findOne({
        email,
        password
    })

    if(logIn){
        res.json({
            message: "Signed In Successfully",
            logIn
        })
    }
    else{
        res.json({
            message: "email or password is incorect",
        })
    }
} 

// ======================== update User ==========================

export let UpdateUser = async(req,res)=>{
    let {userName,email,gender,phone,age} = req.body
    let {_id} = req.params
    let checkForEmail = await User.findOne({email})

    if(checkForEmail){
        return res.json({
            message: 'This Email is already in use please try another email address',
        })
    }

    let user = await User.findByIdAndUpdate(_id,{userName,email,gender,phone,age},{new:true})
    if (!user) {
        return res.json({
            message: 'User Updated fail',
            user
        })
    }

    res.json({
        message: 'User Updated successfully',
        user
    })
} 

// ======================== delete User ==========================

export let deleteUser = async(req,res)=>{
    let {_id} = req.params
    let user = await User.findByIdAndDelete(_id)
    if (!user) {
        return res.json({
            message: 'User Does not exist',
        })
    }
    res.json({
        message: 'deleted successfully',
    })
} 


// ======================== search For User with conditions ==========================

export let searchByLetterAndAge = async (req,res)=>{
        try {
        let {letter, age} = req.body
        let regex = new RegExp(letter);
        
        let user = await User.find({ userName:regex , age: { $gte: 25 }})
        res.json({
            message: 'done',
            user
        })
    } catch (error) {
        res.json({
            message: 'done',
            error
        }) 
    }

}


// ======================== search For User in range of ages ==========================
export let searchinRangeOfAges = async (req,res)=>{
    try {
    let {minAge, maxAge} = req.body
    
    let user = await User.find({age: { $gte: minAge, $lte:maxAge }})
    res.json({
        message: 'done',
        user
    })
} catch (error) {
    res.json({
        message: 'done',
        error
    }) 
}

}


// ======================== get users With Their Products ==========================

export let  getUsersWithTheirProducts = async (req,res)=>{
    try {
    const users = await User.find();
    const usersWithProducts = await Promise.all(
        users.map(async (user) => {
        const products = await Product.find({ userId: user._id });
        return { user, products };
        })
    );
    res.json(usersWithProducts);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}
