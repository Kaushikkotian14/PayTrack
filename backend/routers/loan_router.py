from fastapi import APIRouter, HTTPException, Depends
from models.loan_model import LoanApplication
from schemas.loan_schema import LoanStatusUpdate
from services.loan_service import (
    apply_new_loan, fetch_pending_loans, approve_loan_by_id,
    reject_loan_by_id, search_user, fetch_all_users
)
from utils.auth_utils import require_role

router = APIRouter()

@router.post("/apply")
async def apply_loan_route(
    request: LoanApplication, 
    user: dict = Depends(require_role(["user"]))
):
    return apply_new_loan(request, user)

@router.get("/pending")
def pending_loans(user: dict = Depends(require_role(["admin"]))):
    return fetch_pending_loans()

@router.post("/approve/{loan_id}")
def approve(loan_id: str, user: dict = Depends(require_role(["admin"]))):
    return approve_loan_by_id(loan_id, user)

@router.post("/reject/{loan_id}")
def reject(loan_id: str, user: dict = Depends(require_role(["admin"]))):
    return reject_loan_by_id(loan_id, user)

@router.get("/user/{phone}")
def get_user(phone: int, user: dict = Depends(require_role(["admin", "user"]))):
    return search_user(phone)

@router.get("/users")
def get_all_users(user: dict = Depends(require_role(["admin"]))):
    return fetch_all_users()
