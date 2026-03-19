import { useEffect, useState } from "react";
import API from "../services/api";
import PlaceBid from "../components/PlaceBid";
import BidList from "../components/BidList";
import useBidsSocket from "../hooks/useBidsSocket";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Fetch initial tasks
  const fetchTasks = () => {
    API.get("/tasks/").then(res => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // WebSocket live update
  useBidsSocket(newBid => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === newBid.task_id) {
          // Add or update bids array for each task
          const updatedBids = task.bids ? [...task.bids, newBid] : [newBid];
          return { ...task, bids: updatedBids };
        }
        return task;
      })
    );
  });

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(task => {
        const lowestBid =
          task.bids && task.bids.length > 0
            ? Math.min(...task.bids.map(b => b.amount))
            : null;

        return (
          <div key={task.id} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Budget: ${task.budget}</p>

            {lowestBid !== null && <p>Lowest Bid: ${lowestBid}</p>}

            <PlaceBid taskId={task.id} onBidPlaced={fetchTasks} />
            <BidList bids={task.bids || []} />
          </div>
        );
      })}
    </div>
  );
}