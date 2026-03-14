import { useState } from "react"
import { createTask } from "../services/api"

export default function PostTask({ onTaskCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")

  const handleSubmit = async (e) => {
  e.preventDefault()

  await createTask({
    title,
    description,
    budget: Number(budget)
  })

  onTaskCreated()   // 🔥 THIS triggers instant refresh

  setTitle("")
  setDescription("")
  setBudget("")
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post a Task</h2>

      <input
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Budget"
        value={budget}
        onChange={e => setBudget(e.target.value)}
      />

      <br /><br />

      <button type="submit">Post Task</button>
    </form>
  )
}