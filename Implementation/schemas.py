from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class EmployeeCreate(BaseModel):
    name: str
    email_id: EmailStr
    password: str
    phone_number: Optional[str] = None
    division: Optional[str] = None
    date_of_joining: Optional[date] = None
    role_type: str



class EmployeeResponse(BaseModel):
    emp_id: int
    name: str
    email_id: str
    phone_number: Optional[str]
    division: Optional[str]
    date_of_joining: Optional[date]
    role_type: str

    model_config = {"from_attributes": True}

class LoginRequest(BaseModel):
    email_id: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"



class SkillCreate(BaseModel):
    skill_name: str

class SkillResponse(BaseModel):
    skill_id: int
    skill_name: str

    model_config = {"from_attributes": True}