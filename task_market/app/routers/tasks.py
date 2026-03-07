from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.task_schema import TaskCreate
from app.models.task import Task
from app.database import SessionLocal

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