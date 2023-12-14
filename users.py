from database import fetchone, fetchall

def create_user(full_name, age, email, username, password, balance):
    query = "CALL create_user(%s, %s, %s, %s, %s, %s)"
    params = (full_name, age, email, username, password, balance)
    result = fetchone(query, params)
    return result["user_id"]  # Updated to use user_id as the primary key

def get_users():
    query = "SELECT user_id, full_name, age, email, username, password, balance FROM users"
    result = fetchall(query)
    return result

def get_user(user_id):
    query = "SELECT user_id, full_name, age, email, username, password, balance FROM users WHERE user_id = %s"
    params = (user_id,)
    result = fetchone(query, params)
    return result

def update_user(user_id, full_name, age, email, username, password, balance):
    query = "CALL update_user(%s, %s, %s, %s, %s, %s, %s)"
    params = (user_id, full_name, age, email, username, password, balance)
    result = fetchone(query, params)
    return result["user_id"]  # Updated to use user_id as the primary key

def delete_user(user_id):
    query = "CALL delete_user(%s)"
    params = (user_id,)
    result = fetchone(query, params)
    return result["user_id"]  # Updated to use user_id as the primary key
