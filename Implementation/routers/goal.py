from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import require_mentor, get_current_user

router = APIRouter(prefix="/mentor", tags=["Mentor"])


@router.post("/{ms_id}/goal", response_model=schemas.GoalResponse)
def create_goal(
    ms_id: int,
    g_data: schemas.GoalCreate,
    db: Session = Depends(get_db),
    mentor: models.Employee = Depends(require_mentor)
):
    mentorship = db.query(models.Mentorship).filter(
        models.Mentorship.ms_id == ms_id,
        models.Mentorship.mentor_id == mentor.emp_id
    ).first()
    if not mentorship:
        raise HTTPException(status_code=404, detail="Mentorship not found or you are not the mentor")

    new_goal = models.Goal(ms_id=ms_id, **g_data.model_dump())
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal



@router.get("/{ms_id}/goals", response_model=list[schemas.GoalResponse])
def get_mentee_goals(
    ms_id: int,
    db: Session = Depends(get_db),
    user: models.Employee = Depends(get_current_user)
):
    mentorship = db.query(models.Mentorship).filter(
        models.Mentorship.ms_id == ms_id
    ).first()
    if not mentorship:
        raise HTTPException(status_code=404, detail="Mentorship not found")
    if user.emp_id not in (mentorship.mentor_id, mentorship.mentee_id):
        raise HTTPException(status_code=403, detail="You are not part of this mentorship.")
    return db.query(models.Goal).filter(models.Goal.ms_id == ms_id).all()


@router.patch("/goal/{g_id}/percent", response_model=schemas.GoalResponse)
def update_goal_percent(
    g_id: int,
    update_data: schemas.GoalUpdatePercent,
    db: Session = Depends(get_db),
    mentor: models.Employee = Depends(require_mentor)
):
    goal = db.query(models.Goal).filter(models.Goal.g_id == g_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    mentorship = db.query(models.Mentorship).filter(
        models.Mentorship.ms_id == goal.ms_id,
        models.Mentorship.mentor_id == mentor.emp_id
    ).first()
    if not mentorship:
        raise HTTPException(status_code=403, detail="You are not the mentor for this goal.")

    if not (0.0 <= update_data.percent <= 100.0):
        raise HTTPException(status_code=400, detail="Percent must be between 0 and 100.")

    goal.percent = update_data.percent
    db.commit()
    db.refresh(goal)
    return goal