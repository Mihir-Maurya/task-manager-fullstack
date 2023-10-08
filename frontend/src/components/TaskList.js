import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from '../App';
import loadingImg from '../assets/loader.gif';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks , setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState('');
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
    try {
      const response = await axios.get(`${URL}/api/tasks`);
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === '') {
      return toast.error('Input field cannot be empty');
    }
    try {
      await axios.post(`${URL}/api/tasks`, { ...formData, completed: false });
      setFormData({ ...formData, name: '' });
      toast.success('Task is added');
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      toast.success('Task deleted successfully');
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === '') {
      return toast.error('Input field cannot be empty');
    }
    try {
     const response =  await axios.put(`${URL}/api/tasks/${taskID}`, { ...formData, completed: false });
     console.log(response); 
     setFormData({ ...formData, name: '' });
      setIsEditing(false);
      toast.success('Task updated successfully');
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task)=>{
    const newFormData = {
      name : task.name,
      completed:true,
    }
    try {
       await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      // console.log(task.completed);
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  
  return (
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
              setToComplete ={setToComplete}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
