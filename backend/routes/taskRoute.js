const express = require("express");
const Task = require("../models/taskModel");
const { createTask, getTasks , getTask, deleteTask, updateTask } = require("../controllers/taskControllers");

const router = express.Router();

router.route("/").post(createTask).get(getTasks);
router.route("/:id").delete(deleteTask).put(updateTask).get(getTask);

// router.post("/api/tasks",createTask );

// router.get("/api/tasks", getTasks);
// router.get("/api/tasks/:id", getTask);
// router.delete("/api/tasks/:id", deleteTask);
// router.put("/api/tasks/:id", updateTask);


module.exports = router;
