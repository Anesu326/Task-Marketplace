import { useEffect, useState } from "react"
import { getTasks } from "../services/api"

export default function TaskList({ tasks, onBidClick }) {
  return (
    <div>
      <h2>Available Tasks</h2>

      {tasks.map(task => (
        <div key={task.id} style={{border:"1px solid #ccc", padding:10, margin:10}}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <strong>${task.budget}</strong>

          <br /><br />

          <button onClick={() => onBidClick(task)}>
            Place Bid
          </button>
        </div>
      ))}
    </div>
  )
}