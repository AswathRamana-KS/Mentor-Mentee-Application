from database import SessionLocal, engine, Base
from models import Employee
from auth import hash_password
from datetime import date

Base.metadata.create_all(bind=engine)

db = SessionLocal()

existing = db.query(Employee).filter(Employee.email_id == "Aswath@ind.tech").first()
if existing:
    print("Admin already exists. Skipping.")
else:
    admin = Employee(
        name="Aswath",
        email_id="Aswath@ind.tech",
        hashed_password=hash_password("admin123"),  
        phone_number="1234567890",
        division="Administration",
        date_of_joining=date(2020, 1, 15),
        role_type="Admin"
    )
    db.add(admin)
    db.commit()

db.close()