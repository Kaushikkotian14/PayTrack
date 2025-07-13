from pydantic import BaseModel

class ExpenseModel(BaseModel):
    description: str
    amount: float
    date: str
    time: str
    category: str
    user_id: str
