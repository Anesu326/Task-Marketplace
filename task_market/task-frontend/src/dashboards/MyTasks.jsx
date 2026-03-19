import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyTasks() {
    const [tasks, setTasks] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    // Fetch tasks every 5 seconds
    useEffect(() => {
        const fetchTasks = () => {
            API.get("/tasks/my-tasks")
                .then(res => setTasks(res.data))
                .catch(err => console.error(err));
        };

        fetchTasks();
        const interval = setInterval(fetchTasks, 5000); // auto-refresh every 5s
        return () => clearInterval(interval);
    }, [refreshKey]);

    return (
        <div>
            <h2>My Tasks</h2>
            {tasks.length === 0 && <p>No tasks created yet</p>}
            {tasks.map(t => (
                <div key={t.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    <p>Budget: ${t.budget}</p>
                    <PlaceBid taskId={t.id} onBidPlaced={() => setRefreshKey(prev => prev + 1)} />
                </div>
            ))}
        </div>
    );
}