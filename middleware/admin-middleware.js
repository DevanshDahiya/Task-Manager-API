const adminMiddleware = (req, res , next)=>{
    if(req.user.role !== "admin"){
        return res.status(404).json({
            success : false , 
            message  : "Access denied , Admin rights required!" 
        });
    }
    next() ;
}

module.exports = adminMiddleware ;