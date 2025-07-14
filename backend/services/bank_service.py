from repositories.bank_repository import insert_bank_account, find_bank_by_phone, update_bank_balance
import random
from datetime import datetime
from repositories.auth_repository import get_user_by_phone
from database import expense_collection
 
def create_bank_account_service(account):
    if find_bank_by_phone(account.phone):
        return {"error": "Phone already registered"}
   
    while True:
        account_number = str(random.randint(100000000000, 999999999999))
        if not find_bank_by_phone(account_number):
            break
    data = {
        "account_number": account_number,
        "AccountHolder": account.name,
        "pan_no": account.pan_no,
        "phone": account.phone,
        "email": account.email,
        "account_type": account.account_type,
        "address": account.address,
        "balance": account.balance,
    }
    insert_bank_account(data)
    return {"msg": "Bank account created", "account_number": account_number}

def transfer_money_service_phone(sender_phone: int, receiver_phone: int, amount: float, description: str, category: str):
    sender_account = find_bank_by_phone(sender_phone)
    receiver_account = find_bank_by_phone(receiver_phone)

    if not sender_account:
        return {"error": "Sender account not found"}
    if not receiver_account:
        return {"error": "Receiver account not found"}
    if sender_phone == receiver_phone:
        return {"error": "Cannot transfer to same account"}
    if sender_account["balance"] < amount:
        return {"error": "Insufficient balance"}
    if amount <= 0:
        return {"error": "Invalid transfer amount"}


    update_bank_balance(sender_phone, sender_account["balance"] - amount)
    update_bank_balance(receiver_phone, receiver_account["balance"] + amount)


    sender_user = get_user_by_phone(sender_phone)
    if not sender_user:
        return {"error": "Sender user not found "}

    expense_data = {
       "transaction_id": str(random.randint(100000, 999999)),
        "user_id": sender_user["username"],
        "to": receiver_account["AccountHolder"],
        "description": description,
        "amount": amount,
        "category": category,
        "date": datetime.now().strftime("%d-%m-%Y"),
        "time": datetime.now().strftime("%H:%M:%S"),
    }

    expense_collection.insert_one(expense_data)

    return {"msg": "Transfer successful", "amount": amount}

