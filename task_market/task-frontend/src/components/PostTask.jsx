import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PostTask() {
  const { user } = useAuth();
  if (!user) return <p>Please log in to post a task</p>;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    await API.post("/tasks/", {
      title,
      description,
      budget: Number(budget),
      location
    });

    alert("Task posted");
    window.location.reload();
  };

  return (
    <div>
      <h2>Post Task</h2>
      <input placeholder="title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="budget" onChange={e => setBudget(e.target.value)} />
      <input placeholder="location" onChange={e => setLocation(e.target.value)} />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}