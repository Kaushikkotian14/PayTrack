from database import loan_collection,bank_collection
from fastapi import HTTPException
from bson import ObjectId

def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc

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

def find_user_by_phone(phone: int):
    return [serialize_doc(doc) for doc in loan_collection.find({"phone": phone})]


def get_all_users():
    return [serialize_doc(doc) for doc in loan_collection.find()]

def get_pending_loans():
     return [serialize_doc(doc) for doc in loan_collection.find({"status": "pending"})]
 
def approve_loan(loan_id: str, approved_by: str):
    loan = loan_collection.find_one({"_id": ObjectId(loan_id)})
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    result = loan_collection.update_one(
        {"_id": ObjectId(loan_id)},
        {
            "$set": {
                "status": "approved"
            }
        }
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Loan not found")

    phone = loan.get("phone")
    amount = loan.get("amount", 0)
    bank_collection.update_one(
        {"phone": phone},
        {"$inc": {"balance": amount}}
    )

    return {"message": "Loan approved successfully"}

def reject_loan(loan_id: str, rejected_by: str):
    result = loan_collection.update_one(
        {"_id": ObjectId(loan_id)},
        {
            "$set": {
                "status": "rejected"
            }
        }
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Loan not found")
    return {"message": "Loan rejected successfully"}