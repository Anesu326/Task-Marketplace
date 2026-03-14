const API_URL = "http://127.0.0.1:8000"

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`)
  return res.json()
}

export const createTask = async (task) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  })
  return res.json()
}