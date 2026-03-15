import { useEffect, useState } from "react"

export default function BidListModal({ task, onClose }) {

  const [bids, setBids] = useState([])

  useEffect(() => {
    if (task) loadBids()
  }, [task])

  const loadBids = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/tasks/${task.id}/bids`)
      const data = await res.json()
      console.log("BIDS:", data)
      setBids(data)
    } catch (err) {
      console.error(err)
    }
  }

  const acceptBid = async (bidId) => {
    await fetch(`http://127.0.0.1:8000/bids/${bidId}/accept`, {
      method: "POST"
    })

    alert("Task Assigned")
    window.location.reload()
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
      <div style={{ background: "white", padding: 20, minWidth: 300 }}>
        <h3>Bids for {task.title}</h3>

        {bids.length === 0 && <p>No bids yet</p>}

        {bids.map(bid => (
          <div key={bid.id} style={{ marginBottom: 10 }}>
            <strong>${bid.amount}</strong>

            <br />

            <button onClick={() => acceptBid(bid.id)}>
              Accept Bid
            </button>
          </div>
        ))}

        <br />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}