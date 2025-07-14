from pydantic import BaseModel
from typing import Optional
 
class ExpenseCreate(BaseModel):
    description: str
    amount: float
    category: str
    to : Optional[str] = None
 
class ExpenseResponse(ExpenseCreate):
    date: str
    time: str
    user_id: str
    expense_id: Optional[str]