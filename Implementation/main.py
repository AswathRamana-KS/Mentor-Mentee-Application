from fastapi import FastAPI
from database import engine, Base
from routers import auth, employees,skills

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Mentor-Mentee API",
    version="0.1.0"
)

app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(skills.router)


@app.get("/")
def root():
    return {"message": "MMA - Hola"}