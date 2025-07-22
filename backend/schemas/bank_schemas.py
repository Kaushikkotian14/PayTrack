from pydantic import BaseModel
from typing import Optional
 
class BankAccount(BaseModel):
    account_number: Optional[str] = None
    name: str
    phone: int
    pan_no: str
    email: str
    age: int
    employment_status: str
    account_type: str
    address: str
    balance: float

class TransferRequest(BaseModel):
    sender_phone: int
    receiver_phone: int
    amount: float
    description: str
    category: str

class BankAccountResponse(BaseModel):
    account_number: str
    AccountHolder: str
    pan_no: str
    phone: int
    age: int
    EmploymentStatus: str
    email: str
    account_type: str
    address: str
    balance: float
    
