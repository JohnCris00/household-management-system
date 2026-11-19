-- HMS database schema (from the HMS ERD). Run once:  mysql -u <user> -p < db/schema.sql
CREATE DATABASE IF NOT EXISTS hms CHARACTER SET utf8mb4;
USE hms;

CREATE TABLE IF NOT EXISTS household (
  household_id INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  address      VARCHAR(255),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS member (
  member_id     INT AUTO_INCREMENT PRIMARY KEY,
  household_id  INT NULL,
  full_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('owner','member') NOT NULL DEFAULT 'member',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (household_id) REFERENCES household(household_id)
);

CREATE TABLE IF NOT EXISTS expense (
  expense_id    INT AUTO_INCREMENT PRIMARY KEY,
  household_id  INT NOT NULL,
  paid_by       INT NOT NULL,
  category      VARCHAR(50) NOT NULL,
  description   VARCHAR(255),
  total_amount  DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
  expense_date  DATE NOT NULL,
  FOREIGN KEY (household_id) REFERENCES household(household_id),
  FOREIGN KEY (paid_by) REFERENCES member(member_id)
);

CREATE TABLE IF NOT EXISTS expense_split (
  split_id     INT AUTO_INCREMENT PRIMARY KEY,
  expense_id   INT NOT NULL,
  member_id    INT NOT NULL,
  amount_owed  DECIMAL(10,2) NOT NULL,
  is_settled   TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (expense_id) REFERENCES expense(expense_id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES member(member_id)
);

CREATE TABLE IF NOT EXISTS chore (
  chore_id     INT AUTO_INCREMENT PRIMARY KEY,
  household_id INT NOT NULL,
  title        VARCHAR(150) NOT NULL,
  assigned_to  INT NOT NULL,
  verified_by  INT NULL,
  due_date     DATE NOT NULL,
  status       ENUM('Pending','Done','Verified') NOT NULL DEFAULT 'Pending',
  FOREIGN KEY (household_id) REFERENCES household(household_id),
  FOREIGN KEY (assigned_to) REFERENCES member(member_id),
  FOREIGN KEY (verified_by) REFERENCES member(member_id)
);

CREATE TABLE IF NOT EXISTS inventory_item (
  item_id       INT AUTO_INCREMENT PRIMARY KEY,
  household_id  INT NOT NULL,
  name          VARCHAR(100) NOT NULL,
  quantity      INT NOT NULL DEFAULT 0,
  unit          VARCHAR(30),
  reorder_level INT NOT NULL DEFAULT 1,
  FOREIGN KEY (household_id) REFERENCES household(household_id)
);

CREATE TABLE IF NOT EXISTS restock (
  restock_id   INT AUTO_INCREMENT PRIMARY KEY,
  item_id      INT NOT NULL,
  expense_id   INT NULL,
  qty_added    INT NOT NULL CHECK (qty_added > 0),
  restock_date DATE NOT NULL,
  FOREIGN KEY (item_id) REFERENCES inventory_item(item_id),
  FOREIGN KEY (expense_id) REFERENCES expense(expense_id)
);
