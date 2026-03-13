from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import require_mentor, get_current_user
from datetime import datetime, timedelta

router = APIRouter(prefix="/mentor", tags=["Mentor"])


@router.post("/mapp", response_model=schemas.MentorApplicationResponse, status_code=status.HTTP_201_CREATED)
def apply_mentorship(
    db: Session = Depends(get_db),
    mentor: models.Employee = Depends(require_mentor)
):

    existing = db.query(models.MentorApplication).filter(
        models.MentorApplication.emp_id == mentor.emp_id
    ).first()

    if existing and existing.status == "Pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application already exists"
        )

    new_mentor = models.MentorApplication(
        emp_id = mentor.emp_id,
        status = "Pending"   ,
        submitted_at = datetime.utcnow(),
        approved_by = None,
        approved_at = None
    )

    db.add(new_mentor)
    db.commit()
    db.refresh(new_mentor)

    return new_mentor
