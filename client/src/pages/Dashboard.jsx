import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import API from "../api/api";
import "../css/Dashboard.css";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); 

  // Fetch Tasks
  const getTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getTasks();

  }, []);

  return (
    <>

      <Navbar />

      <div className="dashboard">

        <div className="dashboard-header">

          <div>

            <h1>Welcome 👋</h1>

            <p>Manage all your daily tasks efficiently.</p>

          </div>

        </div>

        {/* Statistics */}

        <div className="stats">

          <div className="stat-card">

            <h2>{tasks.length}</h2>

            <p>Total Tasks</p>

          </div>

          <div className="stat-card">

            <h2>
              {
                tasks.filter(task => task.status === "Pending").length
              }
            </h2>

            <p>Pending</p>

          </div>

          <div className="stat-card">

            <h2>
              {
                tasks.filter(task => task.status === "In Progress").length
              }
            </h2>

            <p>In Progress</p>

          </div>

          <div className="stat-card">

            <h2>
              {
                tasks.filter(task => task.status === "Completed").length
              }
            </h2>

            <p>Completed</p>

          </div>

        </div>

        <TaskForm
            getTasks={getTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
        />

        <div className="task-list">

          {
            tasks.map((task) => (

              <TaskCard
                key={task._id}
                task={task}
                getTasks={getTasks}
                setEditingTask={setEditingTask}
             />

            ))
          }

        </div>

      </div>

    </>
  );

}

export default Dashboard;