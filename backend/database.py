from pymongo import MongoClient
 
client = MongoClient("mongodb://localhost:27017/")
db_client = client["fastapi_jwt_db"]
 
user_collection = db_client["user"]
expense_collection = db_client["expense"]
bank_collection = db_client["bank_account"]
 