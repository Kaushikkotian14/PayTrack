from database import bank_collection
 
def find_bank_by_phone(phone: int):
    return bank_collection.find_one({"phone": phone})

def insert_bank_account(data: dict):
    return bank_collection.insert_one(data)

def update_bank_balance(phone: int, new_balance: float):
    return bank_collection.update_one(
        {"phone": phone},
        {"$set": {"balance": new_balance}}
    )