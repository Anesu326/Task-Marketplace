from sqlalchemy import Column, Integer, Float, ForeignKey, String
from app.database import Base

class Bid(Base):

    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)

    task_id = Column(Integer, ForeignKey("tasks.id"))
    worker_id = Column(Integer, ForeignKey("users.id"))

    bid_amount = Column(Float)
    message = Column(String)

    status = Column(String, default="PENDING")