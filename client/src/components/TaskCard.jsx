import API from "../api/api";
import "../css/TaskCard.css";

function TaskCard({
  task,
  getTasks,
  setEditingTask,
}) {

  const deleteTask = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();

    } catch (error) {

      console.log(error);
      alert("Delete Failed");

    }

  };

  return (

    <div className="task-card">

      <div className="task-header">

        <h3>{task.title}</h3>

        <span
          className={
            task.status === "Completed"
              ? "completed"
              : task.status === "In Progress"
              ? "inprogress"
              : "pending"
          }
        >
          {task.status}
        </span>

      </div>

      <p>{task.description}</p>

      <div className="task-footer">

        <button
          className="edit-btn"
          onClick={() => setEditingTask(task)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={deleteTask}
        >
          🗑 Delete
        </button>

      </div>

    </div>

  );

}

export default TaskCard;