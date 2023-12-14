import os
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from users import create_user, get_users, get_user, update_user, delete_user
from transactions import create_transaction, get_transactions, get_transaction, update_transaction, delete_transaction
from savings import create_savings, get_savings, get_savings_entry, update_savings, delete_savings
from expenses import create_expense, get_expenses, get_expense, update_expense, delete_expense  # Import expenses functions
from database import set_mysql
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()
# Required
app.config["MYSQL_HOST"] = os.getenv("MYSQL_HOST")
app.config["MYSQL_PORT"] = int(os.getenv("MYSQL_PORT"))
app.config["MYSQL_USER"] = os.getenv("MYSQL_USER")
app.config["MYSQL_PASSWORD"] = os.getenv("MYSQL_PASSWORD")
app.config["MYSQL_DB"] = os.getenv("MYSQL_DB")
# Extra configs, optional but mandatory for this project:
app.config["MYSQL_CURSORCLASS"] = os.getenv("MYSQL_CURSORCLASS")
app.config["MYSQL_AUTOCOMMIT"] = True if os.getenv("MYSQL_AUTOCOMMIT") == "true" else False

mysql = MySQL(app)
set_mysql(mysql)

@app.route("/")
def home():
    return jsonify({"message": "Hello, CSIT327!"})

# User Routes
@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "POST":
        data = request.get_json()
        user_id = create_user(
            data["full_name"], data["age"], data["email"],
            data["username"], data["password"], data["balance"]
        )
        return jsonify({"user_id": user_id})
    else:
        users = get_users()
        return jsonify(users)

@app.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def user(user_id):
    if request.method == "PUT":
        data = request.get_json()
        updated_user_id = update_user(
            user_id,
            data["full_name"], data["age"], data["email"],
            data["username"], data["password"], data["balance"]
        )
        return jsonify({"user_id": updated_user_id})
    elif request.method == "DELETE":
        deleted_user_id = delete_user(user_id)
        return jsonify({"user_id": deleted_user_id})
    else:
        user = get_user(user_id)
        return jsonify(user)

# Transaction Routes
@app.route("/transactions", methods=["GET", "POST"])
def transactions():
    if request.method == "POST":
        data = request.get_json()
        transaction_id = create_transaction(
            data["user_id"], data["amount"], data["description"],
            data["date"], data["time"], data["payment_method"]
        )
        return jsonify({"transaction_id": transaction_id})
    else:
        transactions = get_transactions()
        return jsonify(transactions)

@app.route("/transactions/<int:transaction_id>", methods=["GET", "PUT", "DELETE"])
def transaction(transaction_id):
    if request.method == "PUT":
        data = request.get_json()
        updated_transaction_id = update_transaction(
            transaction_id,
            data["user_id"], data["amount"], data["description"],
            data["date"], data["time"], data["payment_method"]
        )
        return jsonify({"transaction_id": updated_transaction_id})
    elif request.method == "DELETE":
        deleted_transaction_id = delete_transaction(transaction_id)
        return jsonify({"transaction_id": deleted_transaction_id})
    else:
        transaction = get_transaction(transaction_id)
        return jsonify(transaction)

# Savings Routes
@app.route("/savings", methods=["GET", "POST"])
def savings():
    if request.method == "POST":
        data = request.get_json()
        savings_id = create_savings(
            data["user_id"], data["amount"], data["description"],
            data["date"], data["time"], data["category"]
        )
        return jsonify({"savings_id": savings_id})
    else:
        savings_entries = get_savings()
        return jsonify(savings_entries)

@app.route("/savings/<int:savings_id>", methods=["GET", "PUT", "DELETE"])
def savings_entry(savings_id):
    if request.method == "PUT":
        data = request.get_json()
        updated_savings_id = update_savings(
            savings_id,
            data["user_id"], data["amount"], data["description"],
            data["date"], data["time"], data["category"]
        )
        return jsonify({"savings_id": updated_savings_id})
    elif request.method == "DELETE":
        deleted_savings_id = delete_savings(savings_id)
        return jsonify({"savings_id": deleted_savings_id})
    else:
        savings_entry = get_savings_entry(savings_id)
        return jsonify(savings_entry)

# Expenses Routes
@app.route("/expenses", methods=["GET", "POST"])
def expenses():
    if request.method == "POST":
        data = request.get_json()
        expense_id = create_expense(
            data["user_id"], data["amount"], data["description"],
            data["frequency"], data["paid"]
        )
        return jsonify({"expense_id": expense_id})
    else:
        expenses_entries = get_expenses()
        return jsonify(expenses_entries)

@app.route("/expenses/<int:expense_id>", methods=["GET", "PUT", "DELETE"])
def expense(expense_id):
    if request.method == "PUT":
        data = request.get_json()
        updated_expense_id = update_expense(
            expense_id,
            data["user_id"], data["amount"], data["description"],
            data["frequency"], data["paid"]
        )
        return jsonify({"expense_id": updated_expense_id})
    elif request.method == "DELETE":
        deleted_expense_id = delete_expense(expense_id)
        return jsonify({"expense_id": deleted_expense_id})
    else:
        expense_entry = get_expense(expense_id)
        return jsonify(expense_entry)

if __name__ == "__main__":
    app.run(debug=True)
