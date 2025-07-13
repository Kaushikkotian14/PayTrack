from pydantic import BaseModel
from typing import Optional
 
class UserRegister(BaseModel):
    phone: int
    pan_no: str
    password: str
    username: Optional[str] = None
    
class User(BaseModel):
    username: Optional[str] = None
    pan_no: Optional[str] = None
    phone: Optional[int] = None
    
class Token(BaseModel):
    access_token: str
    token_type: str
 
class TokenData(BaseModel):
    username: Optional[str] = None