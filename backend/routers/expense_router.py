from fastapi import APIRouter, Depends, HTTPException
from schemas.expense_schemas import ExpenseCreate
from services.expense_service import delete_expense_service, get_expenses_service, update_expense_service,create_expense_service, transfer_amount_service 
from utils.auth_utils import get_current_user

 
router = APIRouter()
 
@router.post("/expense")
async def add_expense(expense: ExpenseCreate, current_user: dict = Depends(get_current_user)):
    return create_expense_service(expense, current_user["username"])


@router.get("/expense/{username}")
async def get_expenses_by_user(current_user: dict = Depends(get_current_user)):
    username = current_user["username"]
    return get_expenses_service(username)

@router.put("/expense/{expense_id}")
async def update_expense(expense_id: str, expense: ExpenseCreate, current_user: dict = Depends(get_current_user)):
    return update_expense_service(expense_id, expense, current_user["username"])

@router.delete("/expense/{expense_id}")
async def delete_expense(expense_id: str, current_user: dict = Depends(get_current_user)):
    return delete_expense_service(expense_id, current_user["username"])

