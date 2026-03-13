from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Employee(Base):
    __tablename__ = "employees"

    emp_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email_id = Column(String(150), unique=True, nullable=False)    
    hashed_password = Column(String(255), nullable=False)
    phone_number = Column(String(20))
    division = Column(String(100))
    date_of_joining = Column(Date)
    role_type = Column(String(50))
    years_of_exp = Column(Integer)

class Skills(Base):
    __tablename__ = "skills"

    skill_id = Column(Integer, primary_key=True, index=True)
    skill_name = Column(String(100), nullable=False)

class MentorApplication(Base):
    __tablename__ = "mentor_application"

    ma_id = Column(Integer, primary_key=True, index=True)

    # Foreign Key
    emp_id = Column(Integer, ForeignKey("employees.emp_id"))

    skill_id = Column(Integer, ForeignKey("skills.skill_id"))

    status = Column(String(50), nullable=False)    
    submitted_at = Column(Date)
    approved_by = Column(String(50))    
    approved_at = Column(Date)

class Mentors(Base):
    __tablename__ = "mentors"

    m_id = Column(Integer, primary_key=True, index=True)

    # Foreign Key
    ma_id = Column(Integer, ForeignKey("mentor_application.ma_id"))    
    emp_id = Column(Integer, ForeignKey("employees.emp_id"))
    skill_id = Column(Integer, ForeignKey("skills.skill_id"))

class PracticeHead(Base):
    __tablename__ = "practice_head"

    ph_id = Column(Integer, primary_key=True, index=True)

    emp_id = Column(Integer, ForeignKey("employees.emp_id"))
    skill_id = Column(Integer, ForeignKey("skills.skill_id"))

    employee = relationship("Employee")
    skill = relationship("Skills")

class MentorshipRequest(Base):
    __tablename__ = "mentorship_request"

    mr_id = Column(Integer, primary_key=True, index=True)

    mentor_id = Column(Integer, ForeignKey("employees.emp_id"))
    mentee_id = Column(Integer, ForeignKey("employees.emp_id"))    
    skill_id = Column(Integer, ForeignKey("skills.skill_id"))    
    status = Column(String(50))

class Mentorship(Base):
    __tablename__ = "mentorship"

    ms_id = Column(Integer, primary_key=True, index=True)

    mentor_id = Column(Integer, ForeignKey("employees.emp_id"))
    mentee_id = Column(Integer, ForeignKey("employees.emp_id"))    
    skill_id = Column(Integer, ForeignKey("skills.skill_id"))


