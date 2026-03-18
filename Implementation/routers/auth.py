from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import verify_password, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=schemas.TokenResponse)
def login(credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    employee = db.query(models.Employee).filter(
        models.Employee.email_id == credentials.username
    ).first()

    if not employee or not verify_password(credentials.password, employee.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    token = create_access_token(data={"sub": employee.email_id})

    return {"access_token": token, "token_type": "bearer"}

@router.post("/enroll-auth")
def enroll_auth(
    role : bool,
    skill_id : int,
    credentials: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_db),
    ):
    employee = db.query(models.Employee).filter(
        models.Employee.email_id == credentials.username
    ).first()

    if not employee or not verify_password(credentials.password, employee.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    if role:
        existing = db.query(models.MentorApplication).filter(
            models.MentorApplication.emp_id == employee.emp_id,
            models.MentorApplication.skill_id == skill_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Application already exists"
            )
        new_mentor_app = models.MentorApplication(
            emp_id = employee.emp_id,
            status = "Pending",
            skill_id = skill_id,
            submitted_at = datetime.now().date(),
            approved_by = None,
            approved_at = None
        )

        db.add(new_mentor_app)
        db.commit()
        db.refresh(new_mentor_app)
    else :
        pass


    token = create_access_token(data={"sub": employee.email_id})

    return {
        "access_token": token, 
        "token_type": "bearer"
    }
