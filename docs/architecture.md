# Household Management System (HMS) - Architecture & Database Design

## 1. Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript / Responsive UI components
* **Backend:** Node.js, Express.js API framework[cite: 3]
* **Database:** Relational Database (MySQL / PostgreSQL) managed via relational schemas[cite: 3]
* **Version Control:** Git & GitHub (Branching strategy: `main`, `feature/`, `fix/`)[cite: 1]

---

## 2. Database Tables & Schema

### `User` Table
* `user_id` (PK, INT)
* `username` (VARCHAR)
* `email` (VARCHAR)
* `password_hash` (VARCHAR)

### `Household` Table
* `household_id` (PK, INT)
* `household_name` (VARCHAR)
* `invite_code` (VARCHAR)

### `Chore` Table (Cris's Module)[cite: 3]
* `chore_id` (PK, INT)
* `household_id` (FK, INT)
* `title` (VARCHAR)
* `description` (TEXT)
* `assigned_to` (FK, INT)
* `verified_by` (FK, INT, Nullable)
* `status` (ENUM: 'Pending', 'Awaiting Verification', 'Approved')[cite: 3]
* `due_date` (DATETIME)
* `completed_at` (DATETIME, Nullable)
* `remarks` (TEXT, Nullable)

### `Expense` Table (Francis Jake's Module)[cite: 3]
* `expense_id` (PK, INT)
* `household_id` (FK, INT)
* `paid_by` (FK, INT)
* `total_amount` (DECIMAL)
* `split_details` (JSON)

### `Inventory` Table (Vince Jayson's Module)[cite: 3]
* `item_id` (PK, INT)
* `household_id` (FK, INT)
* `item_name` (VARCHAR)
* `quantity` (INT)
* `reorder_threshold` (INT)