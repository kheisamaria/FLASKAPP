from database import fetchone, fetchall

def create_transaction(user_id, amount, description, date, time, payment_method):
    query = "CALL create_transaction(%s, %s, %s, %s, %s, %s)"
    params = (user_id, amount, description, date, time, payment_method)
    result = fetchone(query, params)
    return result["transaction_id"]

def get_transactions():
    query = "SELECT * FROM transactions"
    result = fetchall(query)
    return result

def get_transaction(transaction_id):
    query = "SELECT * FROM transactions WHERE transaction_id = %s"
    params = (transaction_id,)
    result = fetchone(query, params)
    return result

def get_transactions_by_user(user_id):
    query = "SELECT transaction_id, user_id, amount, description, date, time, payment_method FROM transactions WHERE user_id = %s"
    params = (user_id,)
    result = fetchall(query, params)
    return result

def update_transaction(transaction_id, user_id, amount, description, date, time, payment_method):
    query = "CALL update_transaction(%s, %s, %s, %s, %s, %s, %s)"
    params = (transaction_id, user_id, amount, description, date, time, payment_method)
    result = fetchone(query, params)
    return result["transaction_id"]

def delete_transaction(transaction_id):
    query = "CALL delete_transaction(%s)"
    params = (transaction_id,)
    result = fetchone(query, params)
    return result["transaction_id"]
