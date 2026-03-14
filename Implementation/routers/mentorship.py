from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import require_mentor, get_current_user

router = APIRouter(prefix="/mentor", tags=["Mentor"])


@router.post("/request", response_model=schemas.MentorShipRequestResponse, status_code=status.HTTP_201_CREATED, summary = "Request for mentorship")
def request_mentorship(
    mentor_data : schemas.MentorShipRequest,
    db: Session = Depends(get_db),
    mentee : models.Employee = Depends(get_current_user)
):
    new_mentorship_req = models.MentorshipRequest(
        mentor_id = mentor_data.mentor_id,
        mentee_id = mentee.emp_id,   
        skill_id = mentor_data.skill_id,   
        status = "Pending"
    )

    db.add(new_mentorship_req)
    db.commit()
    db.refresh(new_mentorship_req)

    return new_mentorship_req

@router.get("/getreqs", response_model=list[schemas.MentorShipRequestResponse], summary="Get All Mentorship Request")
def get_all_mreq(
    db: Session = Depends(get_db),
    current_user: models.Employee = Depends(get_current_user)
):
    if current_user.role_type == "Admin":
        return db.query(models.MentorshipRequest).all()

    ph_record = db.query(models.PracticeHead).filter(
        models.PracticeHead.emp_id == current_user.emp_id
    ).first()

    if ph_record:
        return db.query(models.MentorshipRequest).filter(
            models.MentorshipRequest.skill_id == ph_record.skill_id
        ).all()

    mentor_record = db.query(models.Mentors).filter(
        models.Mentors.emp_id == current_user.emp_id
    ).first()

    if mentor_record:
        return db.query(models.MentorshipRequest).filter(
            models.MentorshipRequest.mentor_id == current_user.emp_id
        ).all()

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You do not have permission to view mentorship requests."
    )

@router.post("/accept",response_model= schemas.MentorShipAcceptResponse, summary="Accept Mentee")
def mentor_accept(
    msa_data : schemas.MentorShipAccept,
    db : Session = Depends(get_db),
    mentor : models.Mentors = Depends(require_mentor)
):
    request = db.query(models.MentorshipRequest).filter(models.MentorshipRequest.mr_id == msa_data.mr_id).first()

    if not request:
        raise HTTPException(status_code=404, detail="Mentorship request not found")
    
    if request.status == "Accepted":
        raise HTTPException(status_code=400, detail="Request is already Accepted")
    
    request.status = "Accepted"

    new_mentorship = models.Mentorship(
        mentor_id = request.mentor_id,
        mentee_id = request.mentee_id,
        skill_id = request.skill_id
    )

    db.add(new_mentorship)
    db.commit()
    db.refresh(new_mentorship)

    return new_mentorship

@router.get("/skills/{s_id}",response_model=list[schemas.SkillReqResponse],summary= "Get mentors for skills")
def get_ment_by_skill(
    s_id : int,
    user : models.Employee = Depends(get_current_user),
    db : Session = Depends(get_db)
):
    skill_ments = db.query(models.Mentors).filter(
        models.Mentors.skill_id == s_id
    ).all()
    return [
    {
        "skill": m.skill,
        "mentor": m.mentor
    } for m in skill_ments
]

@router.get("/getmentee", response_model=list[schemas.MenteeResponse], summary="Get All Mentees")
def get_all_mentee(
    db: Session = Depends(get_db),
    current_user: models.Employee = Depends(get_current_user)
):
    if current_user.role_type == "Admin":
        return db.query(models.Mentorship).all()

    ph_record = db.query(models.PracticeHead).filter(
        models.PracticeHead.emp_id == current_user.emp_id
    ).first()

    if ph_record:
        return db.query(models.Mentorship).filter(
            models.Mentorship.skill_id == ph_record.skill_id
        ).all()

    mentor_record = db.query(models.Mentorship).filter(
        models.Mentorship.mentor_id == current_user.emp_id
    ).all()

    if mentor_record:
        return mentor_record

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You do not have permission to view mentorship requests."
    )


