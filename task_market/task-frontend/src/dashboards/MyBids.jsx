import { useEffect, useState } from "react";
import API from "../services/api";
import useBidsSocket from "../hooks/useBidsSocket";

export default function MyBids() {
    const [bids, setBids] = useState([]);

    // Initial fetch
    useEffect(() => {
        API.get("/bids/my-bids").then(res => setBids(res.data));
    }, []);

    // Live updates
    useBidsSocket(newBid => {
        if (newBid.user_id === parseInt(localStorage.getItem("userId"))) {
            setBids(prev => [...prev, newBid]);
        }
    });

    return (
        <div>
            <h2>My Bids (Live)</h2>
            {bids.map(b => (
                <p key={b.id}>
                    Task ID: {b.task_id} | Amount: ${b.amount}
                </p>
            ))}
        </div>
    );
}