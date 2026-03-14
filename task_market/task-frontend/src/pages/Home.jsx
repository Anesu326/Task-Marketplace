import { useEffect, useState } from "react"
import TaskList from "../components/TaskList"
import PostTask from "../components/PostTask"
import { getTasks } from "../services/api"

export default function Home() {
  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const data = await getTasks()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div style={{padding:20}}>
      <h1>Task Marketplace</h1>

      <PostTask onTaskCreated={loadTasks} />

      <TaskList tasks={tasks} />
    </div>
  )
}