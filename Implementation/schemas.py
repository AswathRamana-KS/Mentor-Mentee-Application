from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional



# Employee -----------------------------------------------
class EmployeeCreate(BaseModel):
    name: str
    email_id: EmailStr
    password: str
    phone_number: Optional[str] = None
    division: Optional[str] = None
    date_of_joining: Optional[date] = None
    role_type: str
    years_of_exp : int

class EmployeeResponse(BaseModel):
    emp_id: int
    name: str
    email_id: str
    phone_number: Optional[str]
    division: Optional[str]
    date_of_joining: Optional[date]
    role_type: str
    years_of_exp : int

    model_config = {"from_attributes": True}

class LoginRequest(BaseModel):
    email_id: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# Skill -----------------------------------------------
class SkillCreate(BaseModel):
    skill_name: str

class SkillResponse(BaseModel):
    skill_id: int
    skill_name: str

    model_config = {"from_attributes": True}


# Mentor -----------------------------------------------

class MentorApplication(BaseModel):
    skill_id : int

class MentorApplicationResponse(BaseModel):
    ma_id: int
    emp_id : int
    skill_id :int
    status : str = "Pending"  
    submitted_at : Optional[date]    
    approved_at : Optional[date] = None
    approved_by : Optional[str] = None

    model_config = {"from_attributes": True}

class MentorApproval(BaseModel):
    ma_id : int

class MentorApprovalResponse(BaseModel):
    m_id : int
    ma_id: int
    emp_id : int
    skill_id :int    

    model_config = {"from_attributes": True}




# PracticeHead ----------------------------------------

class practiceHeadAddition(BaseModel):
    emp_id : int
    skill_id : int

class practiceHeadResponse(BaseModel):
    ph_id : int
    emp_id : int
    skill_id : int

    employee: EmployeeResponse 
    skill: SkillResponse

    model_config = {"from_attributes": True}