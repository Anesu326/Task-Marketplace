import { useEffect, useState } from "react";
import API from "../services/api";

export default function BidList({ taskId }) {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    API.get(`/bids/task/${taskId}`)
      .then(res => setBids(res.data))
      .catch(err => console.log(err));
  }, [taskId]);

  const lowest = bids.length
    ? Math.min(...bids.map(b => b.amount))
    : null;

  return (
    <div style={{ marginTop: 10 }}>
      <strong>Bids ({bids.length})</strong>

      {bids.map(b => (
        <p
          key={b.id}
          style={{
            fontWeight: b.amount === lowest ? "bold" : "normal",
            color: b.amount === lowest ? "green" : "#374151"
          }}
        >
          ${b.amount} {b.amount === lowest && "⭐ lowest"}
        </p>
      ))}
    </div>
  );
}