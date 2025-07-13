To install Fast Api :pip install fastapi
To install uvicorn server:pip install uvicorn
To run server : python -m uvicorn main:app --reload
Default server: http://127.0.0.1:8000

For sql:pip install fastapi uvicorn sqlalchemy pymysql
URL = 'mysql+pymysql://root:root@localhost/schema_name'

To create virtual env:python -m venv myenv 
to enter virtual env:myenv\Scripts\activate
to install requirements:pip install -r requirements.txt




To use mongodb: python -m pip install "pymongo[srv]" 
and add connection url in config.py mongodb://localhost:27017/

For JWT token authentications:
>pip install python-multipart
>pip install python-jose[cryptography]
>pip install passlib[bcrypt]



<!-- {
  "username": "Amit",
  "email": "amit123@gmail.com",
  "phone": 9876543210,
  "password": "Amit@123"
}

{
  "username": "Priya",
  "email": "priya.k@example.com",
  "phone": 9123456789,
  "password": "Priya2024"
}

{
  "username": "Rohan",
  "email": "rohan.mehta@gmail.com",
  "phone": 8899776655,
  "password": "Rohan@456"
}

{
  "username": "Sneha",
  "email": "sneha_92@example.com",
  "phone": 9988776655,
  "password": "SnehaPwd!"
}
 -->