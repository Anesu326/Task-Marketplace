from sqlalchemy import Column, Integer, String, Float, Text
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    budget = Column(Float)
    location = Column(String)