from database import loan_collection
from fastapi import HTTPException
from bson import ObjectId

def apply_loan(data: dict):
    existing = loan_collection.find_one({
        "phone": data["phone"],
        "status": "pending"
    })
    if existing:
        raise HTTPException(status_code=400, detail="Loan already applied and pending review")

    loan_collection.insert_one({
        **data,
        "status": "pending",
    })

def get_pending_loans():
    return list(loan_collection.find({"status": "pending"}))

def approve_loan(loan_id: str, approved_by: str):
    result = loan_collection.update_one(
        {"_id": ObjectId(loan_id)},
        {"$set": {"status": "approved", "approved_by": approved_by}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Loan not found")
    return {"message": "Loan approved successfully"}

def reject_loan(loan_id: str, rejected_by: str):
    result = loan_collection.update_one(
        {"_id": ObjectId(loan_id)},
        {"$set": {"status": "rejected", "rejected_by": rejected_by}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Loan not found")
    return {"message": "Loan rejected successfully"}

def find_user_by_phone(phone: int):
    return list(loan_collection.find({"phone": phone}))

def get_all_users():
    return list(loan_collection.find({}))
