from pydantic import BaseModel
from typing import Optional

class BidCreate(BaseModel):
    task_id: int
    amount: float
    worker_id: Optional[int] = None
    message: Optional[str] = None