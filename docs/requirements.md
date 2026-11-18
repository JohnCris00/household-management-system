# Requirements

## Objectives
1. Split shared expenses and track who owes whom.
2. Make chores accountable: assign, complete, verify.
3. Monitor inventory live: stock levels and restock history.
4. Cut disputes by centralizing expense, chore and inventory records.

## Epics
- Accounts & Household
- Chores
- Dashboard & Reminders
- Expenses
- Inventory
- Platform & Data

## MVP scope
All **Must** features: PLT-01, ACC-01, ACC-02, EXP-01, EXP-03, EXP-04, CHR-01, CHR-02, CHR-03, INV-01, INV-02.

## Features
### PLT-01 - Database schema and seed data (Must)
- **Epic:** Platform & Data
- **User story:** As a developer, I want the HMS tables created with sample data so that every module can be built on the same ERD.
- **Acceptance criteria:** Tables Household, Member, Expense, Expense Split, Chore, Inventory Item, Restock exist with PK/FK as in the ERD; seed script loads 1 household and 3 members.
- **Dependencies:** -

### ACC-01 - User registration and login (Must)
- **Epic:** Accounts & Household
- **User story:** As a household member, I want to register and log in so that my actions are tied to me.
- **Acceptance criteria:** Valid credentials open the dashboard; wrong password shows an error; passwords are stored hashed; protected pages redirect to login.
- **Dependencies:** PLT-01

### ACC-02 - Create household and add members (Must)
- **Epic:** Accounts & Household
- **User story:** As a household owner, I want to create a household and add housemates so that we share one record.
- **Acceptance criteria:** Owner can create a household; can add a member by email; each member belongs to exactly one household.
- **Dependencies:** ACC-01

### ACC-03 - Member roles and profile (Should)
- **Epic:** Accounts & Household
- **User story:** As an owner, I want to assign roles (owner/member) so that only owners manage members.
- **Acceptance criteria:** Role shown on profile; only owners can add or remove members.
- **Dependencies:** ACC-02

### EXP-01 - Record an expense (Must)
- **Epic:** Expenses
- **User story:** As a member, I want to record a bill I paid so that the household has a record.
- **Acceptance criteria:** Form captures payer, category, total amount, date; amount must be > 0; saved expense appears in the list.
- **Dependencies:** ACC-02

### EXP-02 - Categorize and filter expenses (Should)
- **Epic:** Expenses
- **User story:** As a member, I want to filter expenses by category and date so that I can find a bill quickly.
- **Acceptance criteria:** Category dropdown (e.g. rent, utilities, groceries); filter by category and date range returns correct rows.
- **Dependencies:** EXP-01

### EXP-03 - Split an expense (Must)
- **Epic:** Expenses
- **User story:** As a payer, I want to split an expense among members so that everyone knows their share.
- **Acceptance criteria:** Split amounts must sum to the expense total, otherwise save is blocked with a message; one split row per member.
- **Dependencies:** EXP-01

### EXP-04 - Settle splits and show who owes whom (Must)
- **Epic:** Expenses
- **User story:** As a member, I want to mark my split as settled and see balances so that debts are clear.
- **Acceptance criteria:** Marking a split sets is_settled = true; balance view shows net owed per member pair.
- **Dependencies:** EXP-03

### CHR-01 - Create and assign a chore (Must)
- **Epic:** Chores
- **User story:** As a member, I want to create a chore with an assignee and due date so that responsibility is clear.
- **Acceptance criteria:** Chore requires title, assignee, due date; appears on assignee's list with status Pending.
- **Dependencies:** ACC-02

### CHR-02 - Mark a chore as done (Must)
- **Epic:** Chores
- **User story:** As an assignee, I want to mark my chore done so that the household knows it was completed.
- **Acceptance criteria:** Only the assignee can mark done; status changes to Done (awaiting verification).
- **Dependencies:** CHR-01

### CHR-03 - Verify or reject a chore (Must)
- **Epic:** Chores
- **User story:** As a housemate, I want to verify or reject a completed chore so that there is proof it was done.
- **Acceptance criteria:** Verifier must be a different member than the assignee; Approve sets Verified, Reject returns it to Pending; verified_by is stored.
- **Dependencies:** CHR-02

### CHR-04 - Chore list with status and overdue highlight (Should)
- **Epic:** Chores
- **User story:** As a member, I want to filter chores by status and see overdue ones highlighted.
- **Acceptance criteria:** Filter by Pending/Done/Verified; chores past due date and not verified are highlighted.
- **Dependencies:** CHR-01

### CHR-05 - Recurring chores (Could)
- **Epic:** Chores
- **User story:** As a member, I want chores to repeat weekly so that I do not recreate them.
- **Acceptance criteria:** Choosing weekly creates the next chore automatically after verification.
- **Dependencies:** CHR-03

### INV-01 - Add and edit inventory items (Must)
- **Epic:** Inventory
- **User story:** As a member, I want to track items with quantity, unit and reorder level so that stock is visible.
- **Acceptance criteria:** Item has name, quantity, unit, location, reorder level; edits save and show immediately.
- **Dependencies:** ACC-02

### INV-02 - Low-stock flag (Must)
- **Epic:** Inventory
- **User story:** As a member, I want items at or below the reorder level highlighted so that I restock in time.
- **Acceptance criteria:** Items with quantity <= reorder_level show a low-stock badge and appear in a banner.
- **Dependencies:** INV-01

### INV-03 - Log a restock (optionally link to expense) (Should)
- **Epic:** Inventory
- **User story:** As a member, I want to log a restock and link the expense that paid for it.
- **Acceptance criteria:** Restock increases quantity by qty_added; expense link is optional and validated if given.
- **Dependencies:** INV-01, EXP-01

### RPT-01 - Household dashboard (Should)
- **Epic:** Dashboard & Reminders
- **User story:** As a member, I want one page showing what I owe, my open chores and low-stock items.
- **Acceptance criteria:** Dashboard shows total owed/owing, chores due within 7 days, count of low-stock items.
- **Dependencies:** EXP-04, CHR-04, INV-02

### RPT-02 - Reminders for due chores and low stock (Could)
- **Epic:** Dashboard & Reminders
- **User story:** As a member, I want reminders so that I do not miss a chore or run out of supplies.
- **Acceptance criteria:** In-app notification appears 1 day before a chore is due and when an item becomes low.
- **Dependencies:** RPT-01
