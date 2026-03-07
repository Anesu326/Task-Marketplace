from fastapi import APIRouter

router = APIRouter()

@router.post("/bids")
def create_bid():
    return {"message": "Bid submitted"}