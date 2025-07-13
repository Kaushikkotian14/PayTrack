from fastapi import APIRouter, Depends, HTTPException
from schemas.auth_schemas import User
from utils.auth_utils import get_current_user
from repositories.auth_repository import get_user_by_username, delete_user
 
router = APIRouter()
 
@router.get("/users/me", response_model=User)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user
 
@router.get("/users/{username}", response_model=User)
async def read_user(username: str, current_user: dict = Depends(get_current_user)):
    user = get_user_by_username(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
 
@router.delete("/user/{username}")
async def remove_user(username: str, current_user: dict = Depends(get_current_user)):
    if current_user["username"] != username:
        raise HTTPException(status_code=403, detail="Unauthorized")
    result = delete_user(username)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"msg": "User deleted successfully"}
 
 

