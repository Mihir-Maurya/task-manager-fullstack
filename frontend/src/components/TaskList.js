import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from '../App';
import loadingImg from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks , setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const getTasks = async () => {
    setIsLoading(true);

     const storedToken = localStorage.getItem("token");
     if (!storedToken) {
       return toast.error("Authentication error");
     }
    try {
      const response = await axios.get(`https://task-manager-server-wine.vercel.app/api/tasks`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      // Handle the case where the token is missing (user not authenticated)
      toast.error('Authentication error');
      return;
    }

    // Make an authenticated API request using the token
    axios.get('https://task-manager-server-wine.vercel.app/api/tasks', {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        // Handle the successful response and update the tasks state
        const fetchedTasks = response.data; // Assuming response.data contains your tasks from MongoDB
        // console.log(response);
      
        setTasks(fetchedTasks);
      })
      .catch((error) => {
        // Handle errors, including 401 Unauthorized
        toast.error('API request failed');
      });

  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        return toast.error("Authentication error");
      }

      await axios.post(
        `https://task-manager-server-wine.vercel.app/api/tasks`,
        { ...formData, completed: false },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      setFormData({ ...formData, name: "" });
      toast.success("Task is added");
      // Refresh tasks after adding a new task
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        return toast.error("Authentication error");
      }

      await axios.delete(`https://task-manager-server-wine.vercel.app/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      toast.success("Task deleted successfully");
      // Refresh tasks after deleting a task
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        return toast.error("Authentication error");
      }

      const response = await axios.put(
        `https://task-manager-server-wine.vercel.app/api/tasks/${taskID}`,
        { ...formData, completed: false },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      toast.success("Task updated successfully");
      // Refresh tasks after updating a task
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  // const createTask = async (e) => {
  //   e.preventDefault();
  //   if (name === '') {
  //     return toast.error('Input field cannot be empty');
  //   }
  //   try {
  //     await axios.post(`${URL}/api/tasks`, { ...formData, completed: false });
  //     setFormData({ ...formData, name: '' });
  //     toast.success('Task is added');
  //     // getTasks();
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // const deleteTask = async (id) => {
  //   try {
  //     await axios.delete(`${URL}/api/tasks/${id}`);
  //     toast.success('Task deleted successfully');
  //     // getTasks();
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  useEffect(()=>{
    const cTask = tasks.filter((task)=>{
      return task.completed === true;
    })
    setCompletedTasks(cTask);
  },[tasks]);

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: task.completed });
    setIsEditing(true);
    setTaskID(task._id);
  };

  // const updateTask = async (e) => {
  //   e.preventDefault();
  //   if (name === '') {
  //     return toast.error('Input field cannot be empty');
  //   }
  //   try {
      
  //    const response =  await axios.put(`${URL}/api/tasks/${taskID}`, { ...formData, completed: false });
  //   //  console.log(response); 
  //    setFormData({ ...formData, name: '' });
  //     setIsEditing(false);
  //     toast.success('Task updated successfully');
  //     // getTasks();
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // const setToComplete = async (task)=>{
  //   const newFormData = {
  //     name : task.name,
  //     completed:true,
  //   }
  //   try {
  //      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
  //     // console.log(task.completed);
  //     // getTasks()
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };

    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      return toast.error("Authentication error");
    }

    try {
      await axios.put(`https://task-manager-server-wine.vercel.app/api/tasks/${task._id}`, newFormData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      // Assuming you have a function to refresh tasks, you can call it here.
      getTasks();

      toast.success("Task marked as completed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logOutHandle = ()=>{
    
    localStorage.removeItem("token");
    navigate('/')
  }

  return (
    <>
      <button onClick={()=>logOutHandle()} style={{display:'inline-block' , position:'absolute' , top:'20px' , right:'40px' , fontSize:'20px' , padding:"15px 20px",  borderRadius:'10px'}}>Logout</button>

      <div>
        <h2>Task Manager</h2>
        <TaskForm
          isEditing={isEditing}
          name={name}
          handleInputChange={handleInputChange}
          createTask={createTask}
          updateTask={updateTask}
        />
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
        <hr />
        {isLoading && (
          <div className="--flex-center">
            <img src={loadingImg} alt="loading" />
          </div>
        )}
        {!isLoading && tasks.length === 0 ? (
          <p className="--py">No task added. Please add a task</p>
        ) : (
          <>
            {tasks.map((task, index) => (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default TaskList;
