from database import fetchone, fetchall


def create_transaction(user_id, amount, description, date_time, payment_method):
    query = "INSERT INTO transactions (user_id, amount, description, date_time, payment_method) VALUES (%s, %s, %s, %s, %s)"
    params = (user_id, amount, description, date_time, payment_method)
    result = fetchone(query, params)
    return result["id"]


def get_transactions():
    query = "SELECT id, user_id, amount, description, date, time, payment_method FROM transactions"
    result = fetchall(query)
    return result


def get_transaction(id):
    query = "SELECT id, user_id, amount, description, date, time, payment_method FROM transactions WHERE id = %s"
    params = (id,)
    result = fetchone(query, params)
    return result


def create_transaction(user_id, amount, description, date, time, payment_method):
    query = "CALL create_transaction(%s, %s, %s, %s, %s, %s)"
    params = (user_id, amount, description, date, time, payment_method)
    result = fetchone(query, params)
    return result["id"]


def update_transaction(id, user_id, amount, description, date, time, payment_method):
    query = "CALL update_transaction(%s, %s, %s, %s, %s, %s, %s)"
    params = (id, user_id, amount, description, date, time, payment_method)
    result = fetchone(query, params)
    return result["id"]


def delete_transaction(id):
    query = "CALL delete_transaction(%s)"
    params = (id,)
    result = fetchone(query, params)
    return result["id"]
