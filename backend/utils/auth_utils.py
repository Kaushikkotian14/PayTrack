from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from repositories.auth_repository import get_user_by_username,get_user_by_phone
from utils.token import SECRET_KEY, ALGORITHM
 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
 
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = get_user_by_username(username)
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        return user
    except JWTError as e:
      print(f"JWT decode error: {e}")
      raise HTTPException(status_code=401, detail="Invalid JWT token")
