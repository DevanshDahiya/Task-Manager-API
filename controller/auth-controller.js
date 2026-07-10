const User = require("../models/user") ;
const generateTokens = require("../utils/generateTokens");

// for registering the users 
const registerUser = async(req, res) =>{
    try{
        const {username , email , password} = req.body ; 
        const existingUser =  await  User.findOne({email}) ;
        if(existingUser){
            return res.status(400).json({
                success: false ,
                message : "User already exists" ,
            });
        }
        const user = await User.create({username ,email , password}) ;
        const token = generateTokens(user._id) ;

        res.status(201).json({
            success : true ,
            token , 
            user : {
                id : user._id ,
                username : user.username , 
                email : user.email ,
                role : user.role 
            }
        });
    }
    catch(err){
        res.status(500).json({
            success : false , 
            message : "Server error" ,
            error : err.message ,
        });
    }
};

// for login in the account 
const loginUser = async(req , res)=>{
    try {
        const {email , password} = req.body ; 
        const user = await User.findOne({ email }) ;
        if(!user){
            return res.status(401).json({
                success : false , 
                message : "Invalid credentials" ,
            });
        }
        // now check for password matching 
        const isMatch = await user.comparePassword(password) ;
        if(!isMatch){
            return res.status(401).json({
                success : false , 
                message : "Invalid credentials" ,
            });
        }
        const token = generateTokens(user._id) ;
        res.status(200).json({
            success : true ,
            token , 
            user : {
                id : user._id,
                username : user.username ,
                email : user.email ,
                role : user.role
            }
        });
    }
    catch(err){
        res.status(500).json({
            success : false , 
            message : "Server error" ,
            error : err.message 
        });
    }
};

module.exports = {registerUser , loginUser} ;