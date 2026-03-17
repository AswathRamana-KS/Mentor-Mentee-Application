from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import require_mentor, get_current_user

router = APIRouter(prefix="/mentor", tags=["Mentor"])


@router.post("/request", response_model=schemas.MentorShipRequestResponse, status_code=201)
def request_mentorship(
    mentor_data: schemas.MentorShipRequest,
    db: Session = Depends(get_db),
    mentee: models.Employee = Depends(get_current_user)
):
    
    mentor_record = db.query(models.Mentors).filter(
        models.Mentors.emp_id == mentor_data.mentor_id,
        models.Mentors.skill_id == mentor_data.skill_id
    ).first()
    if not mentor_record:
        raise HTTPException(status_code=404, detail="Mentor not found for this skill")

    
    existing = db.query(models.MentorshipRequest).filter(
        models.MentorshipRequest.mentor_id == mentor_data.mentor_id,
        models.MentorshipRequest.mentee_id == mentee.emp_id,
        models.MentorshipRequest.skill_id == mentor_data.skill_id,
        models.MentorshipRequest.status == "Pending"
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You already have a pending request with this mentor")

    new_req = models.MentorshipRequest(
        mentor_id=mentor_data.mentor_id,
        mentee_id=mentee.emp_id,
        skill_id=mentor_data.skill_id,
        status="Pending"
    )
    db.add(new_req)
    db.commit()
    db.refresh(new_req)
    return new_req


@router.get("/getreqs", response_model=list[schemas.MentorShipRequestResponse])
def get_all_mreq(
    db: Session = Depends(get_db),
    current_user: models.Employee = Depends(get_current_user)
):
    if current_user.role_type == "Admin":
        return db.query(models.MentorshipRequest).all()

    mentor_record = db.query(models.Mentors).filter(
        models.Mentors.emp_id == current_user.emp_id
    ).first()
    if mentor_record:
        return db.query(models.MentorshipRequest).filter(
            models.MentorshipRequest.mentor_id == current_user.emp_id
        ).all()

    
    return db.query(models.MentorshipRequest).filter(
        models.MentorshipRequest.mentee_id == current_user.emp_id
    ).all()


@router.post("/accept", response_model=schemas.MentorShipAcceptResponse)
def mentor_accept(
    msa_data: schemas.MentorShipAccept,
    db: Session = Depends(get_db),
    mentor: models.Employee = Depends(require_mentor)
):
    request = db.query(models.MentorshipRequest).filter(
        models.MentorshipRequest.mr_id == msa_data.mr_id
    ).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    if request.status == "Accepted":
        raise HTTPException(status_code=400, detail="Already accepted")
    
    if request.mentor_id != mentor.emp_id:
        raise HTTPException(status_code=403, detail="You can only accept your own requests")

    request.status = "Accepted"
    new_mentorship = models.Mentorship(
        mentor_id=request.mentor_id,
        mentee_id=request.mentee_id,
        skill_id=request.skill_id
    )
    db.add(new_mentorship)
    db.commit()
    db.refresh(new_mentorship)
    return new_mentorship



@router.post("/reject", response_model=schemas.MentorShipRequestResponse)
def mentor_reject(
    msr_data: schemas.MentorShipReject,
    db: Session = Depends(get_db),
    mentor: models.Employee = Depends(require_mentor)
):
    request = db.query(models.MentorshipRequest).filter(
        models.MentorshipRequest.mr_id == msr_data.mr_id
    ).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    if request.status != "Pending":
        raise HTTPException(status_code=400, detail=f"Request is already {request.status}")
    if request.mentor_id != mentor.emp_id:
        raise HTTPException(status_code=403, detail="You can only reject your own requests")

    request.status = "Rejected"
    db.commit()
    db.refresh(request)
    return request


@router.get("/skills/{s_id}", response_model=list[schemas.SkillReqResponse])
def get_ment_by_skill(
    s_id: int,
    user: models.Employee = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    skill_ments = db.query(models.Mentors).filter(models.Mentors.skill_id == s_id).all()
    return [{"skill": m.skill, "mentor": m.mentor} for m in skill_ments]


@router.get("/getmentee", response_model=list[schemas.MenteeResponse])
def get_all_mentee(
    db: Session = Depends(get_db),
    current_user: models.Employee = Depends(get_current_user)
):
    if current_user.role_type == "Admin":
        return db.query(models.Mentorship).all()

    mentor_record = db.query(models.Mentors).filter(
        models.Mentors.emp_id == current_user.emp_id
    ).first()

    if mentor_record:
        
        return db.query(models.Mentorship).filter(
            models.Mentorship.mentor_id == current_user.emp_id
        ).all()

    raise HTTPException(status_code=403, detail="You do not have permission to view mentees.")


@router.get("/mymentorship", response_model=list[schemas.MenteeResponse])
def get_my_mentorship(
    db: Session = Depends(get_db),
    current_user: models.Employee = Depends(get_current_user)
):
    return db.query(models.Mentorship).filter(
        models.Mentorship.mentee_id == current_user.emp_id
    ).all()