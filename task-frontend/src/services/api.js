const API_URL = "http://127.0.0.1:8000";

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

  return res.json();
}

export async function createBid(bid) {
  const res = await fetch(`${API_URL}/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bid)
  });

  return res.json();
}