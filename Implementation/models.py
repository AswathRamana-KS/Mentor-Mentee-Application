from sqlalchemy import Column, Integer, String, Date
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

class Skills(Base):
    __tablename__ = "skills"

    skill_id = Column(Integer, primary_key=True, index=True)
    skill_name = Column(String(100), nullable=False)