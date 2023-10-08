import {FaEdit,FaCheck,FaRegTrashAlt} from 'react-icons/fa'
const Task = ({task,index,deleteTask,getSingleTask , setToComplete}) => {
  return (
    <div className={task.completed===true ? 'task-completed':'task'}>
        <p>
          <b>{index+1}. </b>
          {task.name}
        </p>
        <div className='task-icons'>
          <FaCheck color={task.completed === true ? 'grey':'black'} onClick={()=>setToComplete(task)}/>
          <FaEdit color='orangered' onClick={()=>getSingleTask(task)}/>
          <FaRegTrashAlt color='red' onClick={()=>deleteTask(task._id)}/>
        </div>
    </div>
  )
}

export default Task