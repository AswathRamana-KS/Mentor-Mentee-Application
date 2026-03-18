from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import verify_password, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login/init")
def login_init(
    credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    employee = db.query(models.Employee).filter(
        models.Employee.email_id == credentials.username
    ).first()

    if not employee or not verify_password(credentials.password, employee.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    roles = []

    if employee.role_type == "Admin":
        roles.append("Admin")

    if db.query(models.PracticeHead).filter(
        models.PracticeHead.emp_id == employee.emp_id
    ).first():
        roles.append("PracticeHead")

    if db.query(models.Mentors).filter(
        models.Mentors.emp_id == employee.emp_id
    ).first():
        roles.append("Mentor")

    if db.query(models.Mentee).filter(
        models.Mentee.emp_id == employee.emp_id
    ).first():
        roles.append("Mentee")

    if not roles:
        raise HTTPException(status_code=403, detail="No valid role")

    return {
        "email": employee.email_id,
        "status": "multiple_roles" if len(roles) > 1 else "single_role",
        "roles": roles
    }

@router.post("/login/complete", response_model=schemas.TokenResponse)
def login_complete(
    email: str,
    role: str,
    db: Session = Depends(get_db)
):
    employee = db.query(models.Employee).filter(
        models.Employee.email_id == email
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="User not found")

    token = create_access_token(
        data={"sub": employee.email_id, "role": role}
    )

    return {"access_token": token, "token_type": "bearer"}

"""
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
    role = None
    if employee.role_type ==  "Admin":
        role = "Admin"
    ph = db.query(models.PracticeHead).filter(
        models.PracticeHead.emp_id == employee.emp_id
    ).first()

    if ph:
        role = "PracticeHead"
    
    mentor = db.query(models.Mentors).filter(
        models.Mentors.emp_id == employee.emp_id
    ).first()

    mentee = db.query(models.Mentee).filter(
        models.Mentee.emp_id == employee.emp_id
    ).first()

    if mentor and mentee:
        pass
    elif mentor:
        role = "Mentor"
        pass
    elif mentee:
        role = "Mentee"
        pass
    else:
        raise HTTPException(
            status_code=status.HTTP_403_INVALIDREQ,
            detail="Invalid Request"
        )



    token = create_access_token(data={"sub": employee.email_id, "role":role})

    return {"access_token": token, "token_type": "bearer"}

"""

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
        existing = db.query(models.Mentee).filter(
            models.Mentee.emp_id == employee.emp_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Mentee already enrolled"
            )
        new_mentee = models.Mentee(
            emp_id = employee.emp_id
        )

        db.add(new_mentee)
        db.commit()
        db.refresh(new_mentee)


