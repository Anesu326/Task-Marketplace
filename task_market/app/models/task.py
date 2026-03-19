from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    budget = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"))  # NEW