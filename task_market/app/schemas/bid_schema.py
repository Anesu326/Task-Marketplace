from pydantic import BaseModel

class BidCreate(BaseModel):
    amount: float
    task_id: int

class BidOut(BidCreate):
    id: int

    class Config:
        from_attributes = True