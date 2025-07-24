from repositories.auth_repository import get_user_by_phone, create_user, get_user_by_phone,check_user_bank_account,check_user,get_user_by_username, get_user_by_phone
from fastapi import HTTPException
from database import bank_collection
from utils.hashing import Hasher
from datetime import datetime
 
def register_user(user):
    if get_user_by_phone(user.phone):
        raise HTTPException(status_code=400, detail="Phone number already registered")
    if not check_user_bank_account(user.phone):
        raise HTTPException(status_code=400, detail="Bank account does not match with phone number")
    if not check_user(user.phone, user.pan_no):
        raise HTTPException(status_code=400, detail="PAN number does not match with bank account")
    bank_record = bank_collection.find_one({"phone": user.phone})
    if not bank_record or "AccountHolder" not in bank_record:
        raise HTTPException(status_code=400, detail="Username not found in bank record")
    username = bank_record["AccountHolder"]
    user.username = username
    data = {
        "username": user.username,
        "phone": user.phone,
        "pan_no": user.pan_no,
        "hashed_password": Hasher.get_password_hash(user.password),
        "date": datetime.now().strftime("%d-%m-%Y"),
        "time": datetime.now().strftime("%H:%M:%S"),
         "role": "user"
    }
    create_user(data)
    raise HTTPException(status_code=201, detail="User registered successfully")
 

def authenticate_user(username:str,  password: str):
    user = get_user_by_username(username)
    if user  and Hasher.verify_password(password, user["hashed_password"]):
        return user
    return None
 