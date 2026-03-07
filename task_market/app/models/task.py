from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    location = Column(String)
    budget = Column(Float)
    status = Column(String, default="OPEN")
    assigned_worker_id = Column(Integer, nullable=True)