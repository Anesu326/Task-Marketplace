from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.bid import Bid
from app.schemas.bid_schema import BidCreate
from app.utils.auth import get_current_user
from app.api.routes.bids_ws import manager

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def place_bid(bid: BidCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    db_bid = Bid(**bid.dict(), user_id=current_user.id)
    db.add(db_bid)
    db.commit()
    db.refresh(db_bid)
    # Broadcast new bid to WebSocket clients
    import asyncio
    asyncio.create_task(manager.broadcast({
        "id": db_bid.id,
        "task_id": db_bid.task_id,
        "amount": db_bid.amount,
        "user_id": db_bid.user_id
    }))
    return db_bid

@router.get("/task/{task_id}")
def get_bids_for_task(task_id: int, db: Session = Depends(get_db)):
    bids = db.query(Bid).filter(Bid.task_id == task_id).all()
    return bids