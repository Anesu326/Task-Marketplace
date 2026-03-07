from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    phone = Column(String)
    password_hash = Column(String)
    rating = Column(Float, default=0)