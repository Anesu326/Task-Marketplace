from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str
    budget: float
    location: str

class TaskOut(TaskCreate):
    id: int
    user_id: int
    class Config:
        from_attributes = True