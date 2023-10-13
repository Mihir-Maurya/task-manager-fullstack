import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/TaskList";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from './components/Register';
import TaskContainer from './components/TaskContainer';
import ProtectedRoute from './components/ProtectedRoute';
export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Register />} />
          {/* <Route
            path="/api/tasks"
            element={<TaskContainer />  }
          /> */}
          
          <Route
            path="/api/tasks"
            element={<ProtectedRoute Component={TaskContainer} />}
          />
        </Routes>

        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
