from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.task_schema import TaskCreate
from app.models.task import Task
from app.database import SessionLocal
from app.models.bid import Bid
from app.services.location import calculate_distance
from app.services.connection_manager import manager

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

tasks_db = []   # temporary in-memory storage
bids_db = []    # temporary in-memory storage

@router.get("/tasks")
def get_tasks():
    return tasks_db


@router.post("/tasks")
def create_task(task: dict):
    task["id"] = len(tasks_db) + 1
    task["status"] = "OPEN"
    tasks_db.append(task)
    return task

@router.post("/tasks")
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):

    new_task = Task(
        title=task.title,
        description=task.description,
        location=task.location,
        latitude=task.latitude,
        longitude=task.longitude,
        budget=task.budget
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    await manager.broadcast({
        "type": "NEW_TASK",
        "task_id": new_task.id,
        "title": new_task.title,
        "budget": new_task.budget
    })

    return new_task

@router.get("/tasks/{task_id}/bids")
def get_task_bids(task_id: int):
    return [b for b in bids_db if b["task_id"] == task_id]


@router.post("/bids/{bid_id}/accept")
def accept_bid(bid_id: int):
    bid = next((b for b in bids_db if b["id"] == bid_id), None)

    if not bid:
        return {"error": "bid not found"}

    task = next((t for t in tasks_db if t["id"] == bid["task_id"]), None)

    if not task:
        return {"error": "task not found"}

    task["status"] = "ASSIGNED"
    task["assigned_bid"] = bid_id

    print("TASK UPDATED:", task)   # 🔥 debug line

    return {"message": "task assigned"}

@router.post("/tasks/{task_id}/accept-bid/{bid_id}")
def accept_bid(task_id: int, bid_id: int, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.id == task_id).first()

    bid = db.query(Bid).filter(Bid.id == bid_id).first()

    if not task or not bid:
        return {"error": "Task or bid not found"}

    task.status = "ASSIGNED"
    task.assigned_worker_id = bid.worker_id

    bid.status = "ACCEPTED"

    db.commit()

    return {"message": "Worker assigned"}

@router.get("/tasks/nearby")
def get_nearby_tasks(lat: float, lon: float, db: Session = Depends(get_db)):

    tasks = db.query(Task).filter(Task.status == "OPEN").all()

    nearby_tasks = []

    for task in tasks:

        distance = calculate_distance(lat, lon, task.latitude, task.longitude)

        if distance <= 10:
            nearby_tasks.append({
                "task": task,
                "distance_km": round(distance, 2)
            })

    return nearby_tasks