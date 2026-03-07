from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.bid_schema import BidCreate
from app.models.bid import Bid

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/bids")
def create_bid(bid: BidCreate, db: Session = Depends(get_db)):

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

#Get bids for a specific task
@router.get("/tasks/{task_id}/bids")
def get_task_bids(task_id: int, db: Session = Depends(get_db)):

    bids = db.query(Bid).filter(Bid.task_id == task_id).all()

    return bids