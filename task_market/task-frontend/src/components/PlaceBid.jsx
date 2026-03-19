import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PlaceBid({ taskId, onBidPlaced }) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <p>Login to place a bid</p>;

  const handleBid = async () => {
    if (!amount) return alert("Enter a bid amount");

    try {
      setLoading(true);
      const res = await API.post("/bids/", { amount: Number(amount), task_id: taskId });
      setAmount("");
      onBidPlaced?.(); // ✅ triggers dashboard refresh
    } catch (err) {
      console.error(err);
      alert("Bid failed");
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