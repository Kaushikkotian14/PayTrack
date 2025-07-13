from repositories.expense_repository import *
from datetime import datetime
from fastapi import HTTPException
 
def create_expense_service(expense, username):
    data = {
        "description": expense.description,
        "amount": expense.amount,
        "category": expense.category,
        "date": datetime.now().strftime("%d-%m-%Y"),
        "time": datetime.now().strftime("%H:%M:%S"),
        "user_id": username
    }
    insert_expense(data)
    return {"msg": "Expense created successfully"}


def get_expenses_service(username:str,current_user: dict):
    if current_user["username"] != username:
        raise HTTPException(status_code=403, detail="Not authorized to view these expenses")
   
    expenses = []
    for expense in find_expenses_by_user(username):
        expense["expense_id"] = str(expense["_id"])
        expense.pop("_id", None)
        expenses.append(expense)

    if not expenses:
        return {"msg": "No data found"}
    return expenses

def update_expense_service(expense_id: str, expense, username: str):
    try:
        data = {
            "description": expense.description,
            "amount": expense.amount,
            "category": expense.category,
            "date": datetime.now().strftime("%d-%m-%Y"),
            "time": datetime.now().strftime("%H:%M:%S")
        }
        result = update_expense(expense_id, data, username)
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Expense not found or no changes made")
        return {"msg": "Expense updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def delete_expense_service(expense_id: str, username: str):
    try:
        result = delete_expense(expense_id, username)
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Expense not found or not authorized to delete")
        return {"msg": "Expense deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def transfer_amount_service(amount: float, phone: str, username: str):
    try:
       
        recipient = find_user_by_phone(phone)
        if not recipient:
            raise HTTPException(status_code=404, detail="Recipient user not found")

        recipient_phone = recipient["phone"]

        sender = find_user_by_username(username)
        if not sender or sender.get("balance", 0) < amount:
            raise HTTPException(status_code=400, detail="Insufficient balance")

        
        update_user_balance(username, -amount)

        update_user_balance(recipient_phone, amount)

        return {"msg": f"Amount {amount} transferred to {phone} successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
