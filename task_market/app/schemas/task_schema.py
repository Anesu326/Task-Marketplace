from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str
    location: str
    budget: float