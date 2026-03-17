from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.bid import Bid
from app.schemas.bid_schema import BidCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def place_bid(bid: BidCreate, db: Session = Depends(get_db)):
    new_bid = Bid(**bid.dict())
    db.add(new_bid)
    db.commit()
    db.refresh(new_bid)
    return new_bid

@router.get("/task/{task_id}")
def get_bids_for_task(task_id: int, db: Session = Depends(get_db)):
    bids = db.query(Bid).filter(Bid.task_id == task_id).all()
    return bids