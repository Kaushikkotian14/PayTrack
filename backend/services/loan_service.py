from repositories.loan_repository import (
    apply_loan, get_pending_loans, approve_loan,
    reject_loan, find_user_by_phone, get_all_users
)



def apply_new_loan(request, user):
    data_dict = dict(request)
    data_dict["applied_by"] =  user.get("username")
    apply_loan(data_dict)
    return {"message": "Loan application submitted successfully"}

def fetch_pending_loans():
    return get_pending_loans()

def approve_loan_by_id(loan_id, user):
    identifier = user.get("sub") or user.get("email") or user.get("username")
    if not identifier:
        raise Exception("User identifier missing in token")
    return approve_loan(loan_id, identifier)

def reject_loan_by_id(loan_id, user):
    identifier = user.get("sub") or user.get("email") or user.get("username")
    if not identifier:
        raise Exception("User identifier missing in token")
    return reject_loan(loan_id, identifier)

def search_user(phone):
    return find_user_by_phone(phone)

def fetch_all_users():
    return get_all_users()
