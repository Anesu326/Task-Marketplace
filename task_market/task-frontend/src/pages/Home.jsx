import { useEffect, useState } from "react"
import TaskList from "../components/TaskList"
import PostTask from "../components/PostTask"
import BidModal from "../components/BidModal"
import BidListModal from "../components/BidListModal"
import { getTasks } from "../services/api"

export default function Home() {

  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [viewBidsTask, setViewBidsTask] = useState(null)

  const loadTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      console.error("Failed loading tasks", err)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Marketplace</h1>

      <PostTask onTaskCreated={loadTasks} />

      <TaskList
        tasks={tasks}
        onBidClick={setSelectedTask}
        onViewBids={setViewBidsTask}
      />

      <BidModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />

      <BidListModal
        task={viewBidsTask}
        onClose={() => setViewBidsTask(null)}
      />

    </div>
  )
}