from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.bid_schema import BidCreate
from app.models.bid import Bid
from app.models.task import Task   # important for assignment

router = APIRouter()


# ---------- DATABASE SESSION DEPENDENCY ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- CREATE BID ----------
@router.post("/")
def create_bid(bid: BidCreate, db: Session = Depends(get_db)):

    # check task exists
    task = db.query(Task).filter(Task.id == bid.task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # prevent bidding on assigned tasks
    if task.status != "OPEN":
        raise HTTPException(status_code=400, detail="Task is not open for bidding")

    new_bid = Bid(
        task_id=bid.task_id,
        worker_id=bid.worker_id,
        amount=bid.amount,
        message=bid.message
    )

    db.add(new_bid)
    db.commit()
    db.refresh(new_bid)

    return new_bid


# ---------- GET BIDS FOR A TASK ----------
@router.get("/tasks/{task_id}")
def get_task_bids(task_id: int, db: Session = Depends(get_db)):

    bids = db.query(Bid).filter(Bid.task_id == task_id).all()
    return bids


# ---------- ACCEPT BID ----------
@router.post("/{bid_id}/accept")
def accept_bid(bid_id: int, db: Session = Depends(get_db)):

    bid = db.query(Bid).filter(Bid.id == bid_id).first()
    if not bid:
        raise HTTPException(status_code=404, detail="Bid not found")

    task = db.query(Task).filter(Task.id == bid.task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = "ASSIGNED"
    task.assigned_bid_id = bid.id

    db.commit()

    return {"message": "Task assigned successfully"}