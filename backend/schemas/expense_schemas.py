from pydantic import BaseModel
from typing import Optional
 
class ExpenseCreate(BaseModel):
    description: str
    amount: float
    category: str
 
class ExpenseResponse(ExpenseCreate):
    date: str
    time: str
    user_id: str
    expense_id: Optional[str]