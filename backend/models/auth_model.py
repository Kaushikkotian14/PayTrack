from typing import Optional
from pydantic import BaseModel

class UserModel(BaseModel):
    username: str
    phone: int
    pan_no: str
    hashed_password: str
    date: str
    time: str
   
class UserUpdateModel(BaseModel):
    password: Optional[str] = None