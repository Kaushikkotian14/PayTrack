from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth_router, user_router, expense_router, bank_router, loan_router
 
app = FastAPI(
    title="PayTrack API"
)
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, tags=["Auth"])
app.include_router(user_router.router, tags=["User"])
app.include_router(bank_router.router, tags=["Bank"])
app.include_router(expense_router.router, tags=["Expense"])
app.include_router(loan_router.router, tags=["Loan"])