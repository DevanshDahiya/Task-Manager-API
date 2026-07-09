const jwt = require("jsonwebtoken") ;
const User  = require("../models/user") ;

const protect = async(req , res , next )=>{
    try{
        const authHeader = req.headers.authorization; 

        const token = authHeader && authHeader.split(" ")[1] ;
        if(!token ){
            return res.status(401).json({
                success : false , 
                message : "Not authorized , no token"
            });
        }

        const decodeToken = jwt.verify(token , process.env.JWT_SECRET_KEY) ;
        const user = await User.findById(decodeToken.id).select("-password") ;

        if(!user){
            return res.status(401).json({
                success : false ,
                message : "User not found" 
            });
        }
        req.user= user ;
        next() ;// to call next middleware 

    }
    catch(err){
        res.status(401).json({
            success : false , 
            message : "Not authorized , token failed"
        });
    }
    
};

module.exports = protect ;