import { useEffect, useState } from "react"
import { getTasks } from "../services/api"

export default function TaskList({ tasks, onBidClick, onViewBids }) {
    if (!tasks) return <div>Loading...</div>

    return (
        <div>
            <h2>Available Tasks</h2>

            {tasks.map(task => (
                <div
                    key={task.id}
                    style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}
                >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <strong>${task.budget}</strong>
                    <p>Status: {task.status}</p>

                    <br />

                    {task.status === "OPEN" ? (
                        <>
                            <button onClick={() => onBidClick(task)}>Place Bid</button>
                            <button onClick={() => onViewBids(task)}>View Bids</button>
                        </>
                    ) : (
                        <p style={{ color: "green", fontWeight: "bold" }}>
                            Task Assigned
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}