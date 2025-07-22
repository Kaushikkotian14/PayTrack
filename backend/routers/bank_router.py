from fastapi import APIRouter, HTTPException, Depends
from schemas.bank_schemas import BankAccount, BankAccountResponse
from services.bank_service import create_bank_account_service, transfer_money_service_phone,get_bank_account_by_phone
from utils.auth_utils import get_current_user
from database import bank_collection

 
router = APIRouter()
 
@router.post("/bank-account")
async def create_account(account: BankAccount):
    result = create_bank_account_service(account)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.get("/bank-account", response_model=BankAccountResponse)
async def get_bank_account(current_user: dict = Depends(get_current_user)):
    phone = current_user.get("phone")
    return get_bank_account_by_phone(phone)

@router.post("/transfer/phone")
async def transfer_money_via_phone(
    receiver_phone: int,
    amount: float,
    description: str,
    category: str,
    current_user: dict = Depends(get_current_user)
):
    result = transfer_money_service_phone(current_user["phone"], receiver_phone, amount,description,category)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

