from pydantic import BaseModel

class LoanApplication(BaseModel):
    username: str
    phone: int
    pan: str
    amount: float
    duration: int
    reason: str
    

    
    