from pydantic import BaseModel

class BidCreate(BaseModel):
    task_id: int
    worker_id: int
    amount: float
    message: str