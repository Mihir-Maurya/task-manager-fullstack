const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const Task = require("./models/taskModel");
const taskrouter = require("./routes/taskRoute");
const userRouter = require("./routes/userRoute")
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin:["https://task-manager-frontend-pink.vercel.app/"],
  methods:["POST", "GET" , "PUT" , "DELETE"],
  credentials:true
}))
app.use("/",userRouter)
app.use("/api/tasks",taskrouter);



const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();



// "backend": "nodemon backend/server.js",
    // "frontend": "npm start --prefix frontend",
    // "both": "concurrently \"npm run backend\" \"npm run frontend \" "
  
