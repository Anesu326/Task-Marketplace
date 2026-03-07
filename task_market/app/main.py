from fastapi import FastAPI
from app.routers import auth, tasks, bids, users
from app.database import engine
from app.models import task
from app.database import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Marketplace API")

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(bids.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Task Marketplace API running"}