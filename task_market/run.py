from app.database import engine, Base
from app.models import user, task, bid

Base.metadata.create_all(bind=engine)