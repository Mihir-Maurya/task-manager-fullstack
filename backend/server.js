const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const Task = require("./models/taskModel");
const router = require("./routes/taskRoute");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use("/api/tasks",router);

// const logger = (req,res,next) =>{
//   console.log("Middleare ran");
//   next()
// };

//Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

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
