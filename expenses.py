from database import fetchone, fetchall


def create_expense(user_id, amount, description, frequency, paid):
    query = "CALL create_expense(%s, %s, %s, %s, %s)"
    params = (user_id, amount, description, frequency, paid)
    result = fetchone(query, params)
    return result["expense_id"]


def get_expenses():
    query = "SELECT * FROM expenses"
    result = fetchall(query)
    return result


def get_expense(expense_id):
    query = "SELECT * FROM expenses WHERE expense_id = %s"
    params = (expense_id,)
    result = fetchone(query, params)
    return result


def update_expense(expense_id, user_id, amount, description, frequency, paid):
    query = "CALL update_expense(%s, %s, %s, %s, %s, %s)"
    params = (expense_id, user_id, amount, description, frequency, paid)
    result = fetchone(query, params)
    return result["expense_id"]


def delete_expense(expense_id):
    query = "CALL delete_expense(%s)"
    params = (expense_id,)
    result = fetchone(query, params)
    return result["expense_id"]
