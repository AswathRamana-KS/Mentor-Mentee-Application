from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base

from routers import auth, employees, skills, mentorapplication, practiceheadaddition, mentorship, goal

# Create database tables

Base.metadata.create_all(bind=engine)

# Initialize FastAPI app

app = FastAPI(
title="Mentor-Mentee API",
version="0.1.0"
)

# CORS configuration (allow frontend apps)

origins = [
"http://localhost:5173",
"http://localhost:5174",
"http://localhost:5175",
"http://localhost:5176",
"http://localhost:5178",
"http://127.0.0.1:5173",
"http://127.0.0.1:5174",
"http://127.0.0.1:5175",
"http://127.0.0.1:5176",
"http://127.0.0.1:5178"
]

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

# Include routers

app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(skills.router)
app.include_router(mentorapplication.router)
app.include_router(practiceheadaddition.router)
app.include_router(mentorship.router)
app.include_router(goal.router)

# Root endpoint

@app.get("/")
def root():
    return {"message": "MMA - Hola"}
