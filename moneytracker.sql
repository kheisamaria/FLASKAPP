-- Table to store user information
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    age INT,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00
);

-- Procedure to create a new user
DELIMITER $$
CREATE PROCEDURE create_user(
    IN p_full_name VARCHAR(255),
    IN p_age INT,
    IN p_email VARCHAR(255),
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_balance DECIMAL(10,2)
)
BEGIN
    INSERT INTO users (full_name, age, email, username, password, balance)
    VALUES (p_full_name, p_age, p_email, p_username, p_password, p_balance);

    SELECT LAST_INSERT_ID() AS user_id;
END$$
DELIMITER ;

-- Procedure to update user information
DELIMITER //
CREATE PROCEDURE update_user(
    IN p_user_id INT,
    IN p_full_name VARCHAR(255),
    IN p_age INT,
    IN p_email VARCHAR(255),
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_balance DECIMAL(10, 2)
)
BEGIN
    UPDATE users
    SET full_name = p_full_name, age = p_age, email = p_email,
        username = p_username, password = p_password, balance = p_balance
    WHERE user_id = p_user_id;  

    SELECT p_user_id AS user_id;
END //
DELIMITER ;

-- Procedure to delete a user
DELIMITER //
CREATE PROCEDURE delete_user(IN p_user_id INT)
BEGIN
    DELETE FROM users WHERE user_id = p_user_id; 

    SELECT p_user_id AS user_id;
END //
DELIMITER ;



-- Table to store transactions information
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    time TIME NOT NULL,
    payment_method VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Procedure to create a new transaction
DELIMITER $$
CREATE PROCEDURE create_transaction(
    IN p_user_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_description VARCHAR(255),
    IN p_date DATE,
    IN p_time TIME,
    IN p_payment_method VARCHAR(255)
)
BEGIN
    INSERT INTO transactions (user_id, amount, description, date, time, payment_method)
    VALUES (p_user_id, p_amount, p_description, p_date, p_time, p_payment_method);

    SELECT LAST_INSERT_ID() AS transaction_id;
END$$
DELIMITER ;

-- Procedure to update transaction information
DELIMITER $$
CREATE PROCEDURE update_transaction(
    IN p_transaction_id INT,
    IN p_user_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_description VARCHAR(255),
    IN p_date DATE,
    IN p_time TIME,
    IN p_payment_method VARCHAR(255)
)
BEGIN
    UPDATE transactions
    SET user_id = p_user_id, amount = p_amount, description = p_description,
        date = p_date, time = p_time, payment_method = p_payment_method
    WHERE transaction_id = p_transaction_id;
    SELECT p_transaction_id AS transaction_id;
END$$
DELIMITER ;

-- Update the balance of the user after every transaction
DELIMITER //
CREATE TRIGGER after_insert_transaction
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
    DECLARE user_balance DECIMAL(10, 2);
    SELECT balance INTO user_balance FROM users WHERE user_id = NEW.user_id;
    UPDATE users SET balance = user_balance - NEW.amount WHERE user_id = NEW.user_id;
END;
//
DELIMITER ;

-- Procedure to delete a transaction
DELIMITER $$
CREATE PROCEDURE delete_transaction(IN p_transaction_id INT)
BEGIN
    DELETE FROM transactions WHERE transaction_id = p_transaction_id;
    SELECT p_transaction_id AS transaction_id;
END$$
DELIMITER ;

-- View to get users with their transactions
CREATE VIEW users_with_transactions AS
SELECT
    u.user_id AS user_id,
    u.full_name,
    u.age,
    u.email,
    u.username,
    u.password,
    u.balance,
    t.transaction_id,
    t.amount,
    t.description,
    t.date,
    t.time,
    t.payment_method
FROM
    users u
INNER JOIN transactions t ON u.user_id = t.user_id;


-- Table to store savings information
CREATE TABLE savings (
    savings_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    time TIME NOT NULL,
    category VARCHAR(255), 
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Procedure to create a new savings entry
DELIMITER $$
CREATE PROCEDURE create_savings(
    IN p_user_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_description VARCHAR(255),
    IN p_date DATE,
    IN p_time TIME,
    IN p_category VARCHAR(255)
)
BEGIN
    INSERT INTO savings (user_id, amount, description, date, time, category)
    VALUES (p_user_id, p_amount, p_description, p_date, p_time, p_category);

    SELECT LAST_INSERT_ID() AS savings_id;
END$$
DELIMITER ;

-- Procedure to update savings information
DELIMITER $$
CREATE PROCEDURE update_savings(
    IN p_savings_id INT,
    IN p_user_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_description VARCHAR(255),
    IN p_date DATE,
    IN p_time TIME,
    IN p_category VARCHAR(255) 
)
BEGIN
    UPDATE savings
    SET user_id = p_user_id, amount = p_amount,
        description = p_description, date = p_date, time = p_time, category = p_category
    WHERE savings_id = p_savings_id;

    SELECT p_savings_id AS savings_id;
END$$
DELIMITER ;

-- Trigger to handle updates in the savings table
DELIMITER //
CREATE TRIGGER after_update_savings
AFTER UPDATE ON savings
FOR EACH ROW
BEGIN
    DECLARE user_balance DECIMAL(10, 2);

    -- Check if the savings amount was updated
    IF NEW.amount != OLD.amount THEN
        -- Retrieve the current user balance
        SELECT balance INTO user_balance FROM users WHERE user_id = NEW.user_id;

        -- If the new amount is smaller, add the difference to the balance
        IF NEW.amount < OLD.amount THEN
            UPDATE users SET balance = user_balance + (OLD.amount - NEW.amount) WHERE user_id = NEW.user_id;
        -- If the new amount is larger, subtract the difference from the balance
        ELSE
            UPDATE users SET balance = user_balance - (NEW.amount - OLD.amount) WHERE user_id = NEW.user_id;
        END IF;
    END IF;
END;
//
DELIMITER ;

-- Procedure to delete a savings entry
DELIMITER $$
CREATE PROCEDURE delete_savings(IN p_savings_id INT)
BEGIN
    DELETE FROM savings WHERE savings_id = p_savings_id;

    SELECT p_savings_id AS savings_id;
END$$
DELIMITER ;


-- View to get users with their savings
CREATE VIEW users_with_savings AS
SELECT
    u.user_id AS user_id,
    u.full_name,
    u.age,
    u.email,
    u.username,
    u.password,
    u.balance,
    s.savings_id,
    s.amount AS savings_amount,
    s.description AS savings_description,
    s.date AS savings_date,
    s.time AS savings_time,
    s.category AS savings_category
FROM
    users u
INNER JOIN savings s ON u.user_id = s.user_id;


-- Table to store expenses information
CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    frequency VARCHAR(255),
    paid BOOLEAN NOT NULL DEFAULT 0, 
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Procedure to create a new expense
DELIMITER $$
CREATE PROCEDURE create_expense(
    IN p_user_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_description VARCHAR(255),
    IN p_frequency VARCHAR(255),
    IN p_paid BOOLEAN
)
BEGIN
    INSERT INTO expenses (user_id, amount, description, frequency, paid)
    VALUES (p_user_id, p_amount, p_description, p_frequency, p_paid);

    SELECT LAST_INSERT_ID() AS expense_id;
END$$
DELIMITER ;

-- Procedure to update expense information
DELIMITER $$
CREATE PROCEDURE update_expense(
    IN p_expense_id INT,
    IN p_user_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_description VARCHAR(255),
    IN p_frequency VARCHAR(255),
    IN p_paid BOOLEAN
)
BEGIN
    UPDATE expenses
    SET user_id = p_user_id, amount = p_amount,
        description = p_description, frequency = p_frequency, paid = p_paid
    WHERE expense_id = p_expense_id;

    SELECT p_expense_id AS expense_id;
END$$
DELIMITER ;

-- Update the balance of the user after every expense
DELIMITER //
CREATE TRIGGER after_insert_expense
AFTER INSERT ON expenses
FOR EACH ROW
BEGIN
    DECLARE user_balance DECIMAL(10, 2);
    SELECT balance INTO user_balance FROM users WHERE user_id = NEW.user_id;
    UPDATE users SET balance = user_balance - NEW.amount WHERE user_id = NEW.user_id;
END;
//
DELIMITER ;

-- Procedure to delete an expense
DELIMITER $$
CREATE PROCEDURE delete_expense(IN p_expense_id INT)
BEGIN
    DELETE FROM expenses WHERE expense_id = p_expense_id;

    SELECT p_expense_id AS expense_id;
END$$
DELIMITER ;

-- View to get users with their expenses
CREATE VIEW users_with_expenses AS
SELECT
    u.user_id AS user_id,
    u.full_name,
    u.age,
    u.email,
    u.username,
    u.password,
    u.balance,
    e.expense_id,
    e.amount AS expense_amount,
    e.description AS expense_description,
    e.frequency AS expense_frequency,
    e.paid AS expense_paid
FROM
    users u
INNER JOIN expenses e ON u.user_id = e.user_id;