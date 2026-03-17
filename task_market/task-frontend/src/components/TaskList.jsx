import { useEffect, useState } from "react";
import API from "../services/api";
import PlaceBid from "./PlaceBid";
import BidList from "./BidList";


export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        API.get("/tasks/")
            .then(res => setTasks(res.data));
    }, []);

    return (
        <div>
            <h2>Tasks</h2>
            {tasks.map(t => (
                <div
                    key={t.id}
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 16,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                        background: "white"
                    }}
                >
                    <h3 style={{ margin: 0 }}>{t.title}</h3>

                    <p style={{ color: "#6b7280" }}>{t.description}</p>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{
                            background: "#ecfeff",
                            padding: "4px 10px",
                            borderRadius: 8,
                            fontWeight: "bold"
                        }}>
                            Budget ${t.budget}
                        </span>

                        <PlaceBid
                            taskId={t.id}
                            onBidPlaced={() => setRefreshKey(prev => prev + 1)}
                        />
                    </div>

                    <BidList key={refreshKey + "-" + t.id} taskId={t.id} />
                </div>
            ))}
        </div>
    );
}