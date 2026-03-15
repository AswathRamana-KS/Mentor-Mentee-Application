from fastapi import FastAPI
from database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, employees, skills, mentorapplication, practiceheadaddition, mentorship, goal

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Mentor-Mentee API",
    version="0.1.0"
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
