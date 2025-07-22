from fastapi import APIRouter, Depends, HTTPException
from schemas.auth_schemas import User, PasswordUpdate
from utils.auth_utils import get_current_user
from repositories.auth_repository import get_user_by_username, delete_user, update_password
from utils.hashing import Hasher

 
router = APIRouter()
 
@router.get("/user/info", response_model=User)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user
 
@router.get("/users/{username}", response_model=User)
async def read_user(username: str, current_user: dict = Depends(get_current_user)):
    user = get_user_by_username(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/user/{username}/password")
async def update_user_password(
    username: str, 
    password_data: PasswordUpdate, 
    current_user: dict = Depends(get_current_user)
):
    if current_user["username"] != username:
        raise HTTPException(status_code=403, detail="Unauthorized")
    user = get_user_by_username(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not password_data.password:
        raise HTTPException(status_code=400, detail="New password not provided")
    hashed_password = Hasher.get_password_hash(password_data.password)
    if user["hashed_password"] == hashed_password:
        raise HTTPException(status_code=400, detail="New password cannot be the same as the old password")
    result = update_password(username, hashed_password)
    if not result:
        raise HTTPException(status_code=400, detail="Password update failed")
    return {"msg": "Password updated successfully"}
 
@router.delete("/user/{username}")
async def remove_user(username: str, current_user: dict = Depends(get_current_user)):
    if current_user["username"] != username:
        raise HTTPException(status_code=403, detail="Unauthorized")
    result = delete_user(username)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"msg": "User deleted successfully"}
 
 

