const express = require("express") ;
const router = express.Router() ;
const {createTask , getTasks , getTaskById}  = require("../controller/task_controller") ;
const protect = require("../middleware/auth-middleware") ;
const adminMiddleware = require("../middleware/admin-middleware") ;
const validateTask = require("../middleware/task-middleware") ;



router.post("/" ,protect , validateTask ,createTask);
router.get("/" , protect ,getTasks) ;
router.get("/:id", protect , getTaskById) ;

module.exports = router ; 