const Task = require("../models/task") ;
const asyncHandler = require("express-async-handler") ;
const AppError = require("../utils/AppError");
const task = require("../models/task");

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        user: req.user._id,
    });

    res.status(201).json({ 
        success: true, 
        task 
    });
});

const getTasks  = asyncHandler(async(req, res)=>{
    const {status , priority , sortBy , order , page = 1 , limit = 10 }  = req.query ; 

    const query = {user: req.user._id} ;
    if(status) query.status = status ;
    if(priority)    query.priority = priority ;

    const sortOptions = {} ;
    if(sortBy) {
        sortOptions[sortBy] = order === "desc" ? -1 : 1 ;
    } 

    const skip = (Number(page) - 1) * Number(limit);
    const tasks = await Task.find(query).sort(sortOptions).skip(skip).limit(Number(limit)) ;

    const totalTasks = await task.countDocuments(query) ;

    res.status(200).json({
        success : true , 
        count : tasks.length , 
        totalTasks ,
        totalPages : Math.ceil(totalTasks / Number(limit)) ,
        currentPage : Number(page) ,
        tasks ,
    });
    
});

// get single task by id 
const getTaskById = asyncHandler(async(req, res)=>{
    const task = await Task.findById(req.params.id) ;
    if(!task){
        throw new AppError("Task not found" , 404) ;
    }
    if(task.user.toString() !== req.user._id.toString()){
        throw new AppError("Not Authorized to access this task" , 403) ;
    }
    res.status(200).json({
        success: true,
        task,
    });
});
    




module.exports = {createTask , getTasks , getTaskById}   ;