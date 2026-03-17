import { useState } from "react";
import API from "../services/api";

export default function PlaceBid({ taskId, onBidPlaced }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBid = async () => {
    try {
      setLoading(true);

      const res = await API.post("/bids/", {
        amount: Number(amount),
        task_id: taskId
      });

      setAmount("");
      if (onBidPlaced) onBidPlaced();  // ✅ must call prop if defined
      alert("✅ Bid placed: $" + res.data.amount);

    } catch (err) {
      console.error("Bid error:", err);
      alert("❌ Bid failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="Bid amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleBid} disabled={loading}>
        {loading ? "Placing..." : "Place Bid"}
      </button>
    </div>
  );
}