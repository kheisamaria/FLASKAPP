from database import fetchone, fetchall

def create_savings(user_id, amount, description, date, time, category):
    query = "CALL create_savings(%s, %s, %s, %s, %s, %s)"
    params = (user_id, amount, description, date, time, category)
    result = fetchone(query, params)
    return result["savings_id"]

def get_savings():
    query = "SELECT * FROM savings"
    result = fetchall(query)
    return result

def get_savings_entry(savings_id):
    query = "SELECT * FROM savings WHERE savings_id = %s"
    params = (savings_id,)
    result = fetchone(query, params)
    return result

def get_savings_by_user(user_id):
    query = "SELECT savings_id, user_id, amount, description, date, time, category FROM savings WHERE user_id = %s"
    params = (user_id,)
    result = fetchall(query, params)
    return result

def update_savings(savings_id, user_id, amount, description, date, time, category):
    query = "CALL update_savings(%s, %s, %s, %s, %s, %s, %s)"
    params = (savings_id, user_id, amount, description, date, time, category)
    result = fetchone(query, params)
    return result["savings_id"]

def delete_savings(savings_id):
    query = "CALL delete_savings(%s)"
    params = (savings_id,)
    result = fetchone(query, params)
    return result["savings_id"]
