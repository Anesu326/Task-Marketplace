import { useState } from "react"

export default function BidModal({ task, onClose }) {
  const [amount, setAmount] = useState("")

  const submitBid = async () => {
    await fetch("http://127.0.0.1:8000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task_id: task.id,
        worker_id: 1,
        amount: Number(amount),
        message: "Ready to work"
      }),
    })

    alert("Bid placed")
    onClose()
  }

  if (!task) return null

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ background: "white", padding: 20 }}>
        <h3>Bid for {task.title}</h3>

        <input
          placeholder="Bid Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <br /><br />

        <button onClick={submitBid}>Submit Bid</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}