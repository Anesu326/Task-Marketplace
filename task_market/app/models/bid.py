from sqlalchemy import Column, Integer, Float, ForeignKey
from app.database import Base

class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    task_id = Column(Integer, ForeignKey("tasks.id"))