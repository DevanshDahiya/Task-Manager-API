const {body , validationResult} = require("express-validator") ;

const validateTask = [
    body("title").trim().notEmpty().withMessage("Title is required") ,

    body("status").optional().isIn(["todo" , "in-progress" , "done"]).withMessage("Status must be todo , in-progess, or done"),

    body("priority").optional().isIn(["low" ,"medium" ,"high"]).withMessage("Priority must be low, medium, high") ,

    body("dueDate").optional().isISO8601().withMessage("Due date must be a valid Date") ,

    (req, res , next)=>{
        const errors = validationResult(req) ;
        if(!errors.isEmpty()){
            return res.status(400).json({
                success : false ,
                message : "Validation failed",
                errors : errors.array() ,
            });
        }
        next() ;
    },
];

module.exports = validateTask ;