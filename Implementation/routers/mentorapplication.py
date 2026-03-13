from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import require_mentor_eligible, get_current_user, require_practiceHead
from datetime import datetime, timedelta

router = APIRouter(prefix="/mentor", tags=["Mentor"])


@router.post("/mapp", response_model=schemas.MentorApplicationResponse, status_code=status.HTTP_201_CREATED)
def apply_mentorship(
    mentor_data : schemas.MentorApplication,
    db: Session = Depends(get_db),
    mentor: models.Employee = Depends(require_mentor_eligible)
):

    existing = db.query(models.MentorApplication).filter(
        models.MentorApplication.emp_id == mentor.emp_id,
        models.MentorApplication.skill_id == mentor_data.skill_id,
        models.MentorApplication.status == "Pending"
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application already exists"
        )

    new_mentor_app = models.MentorApplication(
        emp_id = mentor.emp_id,
        status = "Pending",
        skill_id = mentor_data.skill_id,
        submitted_at = datetime.now().date(),
        approved_by = None,
        approved_at = None
    )

    db.add(new_mentor_app)
    db.commit()
    db.refresh(new_mentor_app)

    return new_mentor_app

# @router.get("/",response_model=list[schemas.MentorApplicationResponse],summary="Get All Mentor Applications")
# def get_all_mapp(
#     db : Session = Depends(get_db),
#     admin: models.Employee = Depends(get_current_user)
# ):
#     return db.query(models.MentorApplication).all()

@router.get("/", response_model=list[schemas.MentorApplicationResponse], summary="Get All Mentor Applications")
def get_all_mapp(
    db: Session = Depends(get_db),
    current_user: models.Employee = Depends(get_current_user)
):
    if current_user.role_type == "Admin":
        return db.query(models.MentorApplication).all()

    ph_skills = db.query(models.PracticeHead.skill_id).filter(
        models.PracticeHead.emp_id == current_user.emp_id
    ).all()

    skill_ids = [s[0] for s in ph_skills]

    if skill_ids:
        return db.query(models.MentorApplication).filter(
            models.MentorApplication.skill_id.in_(skill_ids)
        ).all()
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
           detail="Only admins and practice heads can perform this action"
        )

@router.post("/mapprov",response_model= schemas.MentorApprovalResponse, summary="Approve Mentor")
def mentor_approval(
    m_data : schemas.MentorApproval,   
    db : Session = Depends(get_db),
    ph : models.PracticeHead = Depends(require_practiceHead)
):
    application = db.query(models.MentorApplication).filter(models.MentorApplication.ma_id == m_data.ma_id).first()

    if not application:
        raise HTTPException(status_code=404, detail="Mentor application not found")
    
    if application.status == "Approved":
        raise HTTPException(status_code=400, detail="Application is already approved")
    
    application.status = "Approved"
    application.approved_at = datetime.now().date()
    application.approved_by = ph.employee.name

    new_mentor = models.Mentors(
        ma_id = application.ma_id,    
        emp_id = application.emp_id,
        skill_id = application.skill_id
    )

    db.add(new_mentor)
    db.commit()
    db.refresh(new_mentor)

    return new_mentor
