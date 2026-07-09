require("dotenv").config() ; // to get the dotenv content

const express = require("express") ;
const connectToDB = require("./database/db") ;
const authRoutes = require("./routes/auth-routes") ;
const taskRoutes = require("./routes/task_routes") ;
const {notFound ,errorHandler} = require("./middleware/error-middleware-handler") ;
const helmet = require("helmet") ;
const rateLimit = require("express-rate-limit") ;
const mongoSanitize = require("express-mongo-sanitize") ;



const app = express() ;

// security headers 
app.use(helmet()) ;


const PORT = process.env.PORT || 3000 ;

connectToDB() ;
// use of middleware 
app.use(express.json({limit : "10kb"})) ;

// sanitize against Nosql injection 
app.use(mongoSanitize) ;

// general based rate limiter 
const generalLimiter = rateLimit({
    windowMs : 15*60*1000 ,
    max: 100 ,
    message : {success : false , message : "Too many request try again later"} 
});
app.use(generalLimiter) ;


app.use("/api/auth" , authRoutes) ;
app.use("/api/tasks" , taskRoutes) ;

// to detect and give  the message about the error 

app.use(notFound) ;
app.use(errorHandler) ;



app.listen(PORT , ()=>{
    console.log(`Server is running to PORT ${PORT}`) ;
});