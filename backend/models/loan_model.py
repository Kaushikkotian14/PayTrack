from pydantic import BaseModel


class LoanApplication(BaseModel):
    

    amount: float
    duration: int
    reason: str
    
    

    
    
