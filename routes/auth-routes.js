const express = require("express") ;
const rateLimit = require("express-rate-limit") ;
const router = express.Router() ;

const {registerUser , loginUser} = require("../controller/auth-controller");

const loginLimiter = rateLimit({
    windowMs : 15*60*1000 ,  // 15min 
    max : 5 ,
    message : {success : false , message : "Too many login attempts , try again later"} 
});



router.post("/register" , registerUser) ;
router.post("/login" ,loginLimiter ,  loginUser) ;

module.exports = router  ; 