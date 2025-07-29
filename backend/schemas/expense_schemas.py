from pydantic import BaseModel
from typing import Optional
 
class ExpenseCreate(BaseModel):
    description: str
    amount: float
    category: str
    to : Optional[str] = None
    date:str
 
class ExpenseResponse(ExpenseCreate):

    time: str
    user_id: str
    expense_id: Optional[str]