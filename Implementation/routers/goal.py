from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import require_mentor

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
        raise HTTPException(status_code=404, detail="Mentorship not found")

    new_goal = models.Goal(
        ms_id=ms_id,
        **g_data.model_dump()
    )
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal

@router.get("/{ms_id}/goals", response_model=list[schemas.GoalResponse])
def get_mentee_goals(
    ms_id: int,
    db: Session = Depends(get_db),
    user: models.Employee = Depends(require_mentor)
):
    return db.query(models.Goal).filter(models.Goal.ms_id == ms_id).all()


@router.patch("/goal/{g_id}/percent", response_model=schemas.GoalResponse)
def update_goal_percent(
    g_id: int,
    update_data: schemas.GoalUpdatePercent,
    db: Session = Depends(get_db),
    mentor: models.Employee = Depends(require_mentor)
):
    goal = db.query(models.Goal).filter(
        models.Goal.g_id == g_id
    ).first()

    if not goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Goal not found or you are not the assigned mentor"
        )

    goal.percent = update_data.percent

    db.commit()
    db.refresh(goal)
    return goal