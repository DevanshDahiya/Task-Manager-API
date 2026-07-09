const jwt = require("jsonwebtoken") ;

const generateTokens = (userId) =>{
    // it take s3 part -> header , payload , signature 
    return jwt.sign(
        {
            id : userId ,
        },
        process.env.JWT_SECRET_KEY , 
        {
            expiresIn : process.env.JWT_EXPIRE
        }

    );   
};

module.exports = generateTokens;