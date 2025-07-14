from database import user_collection,bank_collection
 
def get_user_by_username(username: str):
    return user_collection.find_one({"username": username})

def get_user_by_phone(phone: int):
    return user_collection.find_one({"phone": phone})

def check_user_bank_account(phone: int):
    return bank_collection.find_one({"phone": phone})

def check_user(phone: int, pan_no: str):
    user = bank_collection.find_one({"phone": phone, "pan_no": pan_no})
    return bool(user)

def create_user(data: dict):
    return user_collection.insert_one(data)
 
def delete_user(username: str):
    return user_collection.delete_one({"username": username})

def update_password(username: str, password: str):
    return user_collection.update_one({"username": username}, {"$set": {"hashed_password": password}})