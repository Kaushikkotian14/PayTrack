from pydantic import BaseModel
from typing import Optional

class LoanStatusUpdate(BaseModel):
    status: str  
    remarks: Optional[str] = None

class SearchUser(BaseModel):
    phone: int