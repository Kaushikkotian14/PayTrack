from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from services.auth_service import register_user, authenticate_user
from utils.token import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from schemas.auth_schemas import UserRegister, Token
 
router = APIRouter()


 
@router.post("/register")
def register(user: UserRegister):
    result = register_user(user)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
 
@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect phone or password")
    token = create_access_token(data={"sub": user["username"], "role": user["role"]}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {
        "access_token": token, 
        "token_type": "bearer", 
        "role": user["role"],
        "user": {
            "username": user["username"],
            "phone": user.get("phone", 0),
            "pan_no": user.get("pan_no", "")
        }
    }