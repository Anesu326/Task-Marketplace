from fastapi import FastAPI
from app.routers import auth, tasks, bids, users, notifications
from app.database import engine
from app.models import task
from app.database import Base
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tasks

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Marketplace API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(bids.router, prefix="/bids", tags=["Bids"])
app.include_router(users.router)
app.include_router(notifications.router)

@app.get("/")
def root():
    return {"message": "Task Marketplace API running"}