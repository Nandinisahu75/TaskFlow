import { useState, useEffect } from "react";
import API from "../api/api";
import "../css/TaskForm.css";

function TaskForm({
  getTasks,
  editingTask,
  setEditingTask,
}) 
{

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
   useEffect(() => {

    if (editingTask) {
      setTask({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
    }

  }, [editingTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    if (editingTask) {

      await API.put(
        `/tasks/${editingTask._id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Updated Successfully");

      setEditingTask(null);

    } else {

      await API.post(
        "/tasks",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Added Successfully");

    }

    setTask({
      title: "",
      description: "",
      status: "Pending",
    });

    getTasks();

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }

};

  return (

    <div className="task-form-container">

      <h2>Add New Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
        />

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit">
           {editingTask ? "✔ Update Task" : "+ Add Task"}
        </button>

      </form>

    </div>

  );

}

export default TaskForm;