from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.task_schema import TaskCreate
from app.models.task import Task
from app.database import SessionLocal
from app.models.bid import Bid

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tasks")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(
        title=task.title,
        description=task.description,
        location=task.location,
        budget=task.budget
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

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