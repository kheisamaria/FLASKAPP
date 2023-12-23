Installation Instructions

1. Make sure you install python 3.0 and above

2. Create a project environment, run PowerShell:

    > mkdir myproject
    > cd myproject
    > py -3 -m venv .venv

3. Activate the environment:

    > .envi\Scripts\activate

4. Install flask

    > pip install Flask

5. Install mysqldb:

    > pip install flask-mysqldb

6. Install dotenv:
    > pip install python-dotenv

To run flask, execute this command:

> flask --app app run --debug



App Description: SpendR - Your Ultimate Financial Companion

Welcome to SpendR, the ultimate financial companion that puts you in control of your money like never before. SpendR is a powerful and intuitive app that seamlessly integrates Users, Savings, Expenses, and Transactions to provide you with a holistic approach to managing your finances. Let's dive into the exciting features and functionalities that make SpendR the go-to app for mastering your financial journey.

User-Centric Features:

Effortless User Management: SpendR allows you to effortlessly create, update, and delete user profiles. Capture vital information such as full name, age, email, username, and password with ease. The app ensures data integrity by enforcing uniqueness in email and username fields, keeping your personal information secure.

Dynamic Balance Tracking: Keep a real-time track of your financial standing with SpendR's dynamic user balance feature. It reflects the impact of your savings, expenses, and transactions, providing you with a clear snapshot of your financial health.

Savings Entity:

Savings Simplified: Record and track your savings effortlessly with SpendR's Create Savings Procedure. Specify the amount, description, date, time, and category to maintain a detailed savings log. The app also provides an intuitive Update Savings Procedure to modify existing entries.

Automatic Balance Adjustment: SpendR takes financial accuracy to the next level with an After Update Savings Trigger. If your savings amount is updated, your user balance is adjusted in real-time, ensuring precision and transparency in your financial data.

Expenses Entity:

Smart Expense Management: Seamlessly manage your expenses using SpendR's Create Expense Procedure. The app automatically adjusts your user balance when an expense is marked as paid. Update Expense Procedure allows flexibility in modifying expense details, while an After Update Expense Balance Trigger fine-tunes your balance if the expense amount changes.

Expense Reversal Assurance: Never worry about accidental deletions. SpendR's After Delete Expense Trigger rectifies your balance if a paid expense is deleted, providing a safety net for your financial data.

Transaction Entity:

Detailed Transaction Log: Keep a detailed log of your financial transactions with SpendR's Create Transaction Procedure. The app ensures that every transaction is reflected in your user balance. Update Transaction Procedure empowers you to modify transaction details as needed.

Real-time Balance Adjustment: SpendR's After Update Transaction Balance Trigger dynamically adjusts your user balance if the transaction amount is updated, offering unparalleled accuracy in your financial representation.

Comprehensive Views:

Users with Savings, Expenses, and Transactions: Gain a comprehensive overview of your financial landscape with SpendR's detailed views that seamlessly integrate Users, Savings, Expenses, and Transactions. This consolidated data empowers you to make informed financial decisions at a glance.

Security and Data Integrity:

SpendR prioritizes the security of your financial data. User passwords are securely stored, and email and username uniqueness prevent duplicate entries, ensuring the integrity of your financial records.

SpendR is not just an app; it's your personal finance ally. With its robust features, real-time balance adjustments, and comprehensive views, SpendR provides an unparalleled experience in managing your money. Take control of your financial journey with SpendR and embark on a path to financial success. Download the app today, and witness the transformation of the way you manage your finances. Your financial well-being is just a tap away!