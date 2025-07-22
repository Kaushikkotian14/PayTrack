from database import expense_collection, user_collection, bank_collection
from bson import ObjectId
 
def insert_expense(data: dict):
    return expense_collection.insert_one(data)
 
def find_expenses_by_user(username: str):
    return expense_collection.find({"$or": [{"user_id": username}, {"to": username}]})
 
def update_expense(expense_id: str, data: dict, username: str):
    return expense_collection.update_one({"_id": ObjectId(expense_id), "user_id": username}, {"$set": data})
 
def delete_expense(expense_id: str, username: str):
    return expense_collection.delete_one({"_id": ObjectId(expense_id), "user_id": username})

def find_user_by_phone(phone: int):
    return bank_collection.find_one({"phone": phone})

def find_user_by_username(username: str):
    return bank_collection.find_one({"username": username})

def update_user_balance(phone: int, new_balance: float):
    return bank_collection.update_one(
        {"phone": phone},
        {"$set": {"balance": new_balance}}
    )