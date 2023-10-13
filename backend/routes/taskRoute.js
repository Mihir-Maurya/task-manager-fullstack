const express = require("express");
const Task = require("../models/taskModel");
const { createTask, getTasks , getTask, deleteTask, updateTask } = require("../controllers/taskControllers");
const authMiddleware = require('../middleware/authMiddleware'); // Import your auth middleware

const router = express.Router();

// Use the authMiddleware to protect the /api/tasks route
router.use(authMiddleware);

router.route("/").post(createTask).get(getTasks);
router.route("/:id").delete(deleteTask).put(updateTask).get(getTask);



module.exports = router;
