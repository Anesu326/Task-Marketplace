import { useEffect, useState } from "react";
import { getTasks } from "../services/api";

function TaskList() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  return (
    <div>
      <h2>Available Tasks</h2>

      {tasks.map(task => (
        <div key={task.id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Budget: ${task.budget}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;