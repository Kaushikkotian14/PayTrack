from pydantic import BaseModel

class BankModel(BaseModel):
    account_number: str
    AccountHolder: str
    pan_no: str
    phone: int
    email: str
    age: int
    employment_status: str
    account_type: str
    address: str
    balance: float
   

class TransferModel(BaseModel):
    sender_phone: int
    receiver_phone: int
    amount: float
    description: str
    category: str
    
