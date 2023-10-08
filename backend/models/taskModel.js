const mongoose = require("mongoose");


const taskSchema = mongoose.Schema(
    {
      name:{
        type:String,
        required:[true,"Please add a task"],
      },
      completed:{
        type:Boolean,
        required:true,
        default:false,
      }
    },
    {
        timestamps:true //it will automatically add time stamps to each task
    }
);


const task = mongoose.model("Task",taskSchema);

module.exports = task;

