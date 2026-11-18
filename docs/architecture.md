# Architecture

A web application backed by a relational database. TODO: add the chosen front end, back end and hosting once decided.

## Data model (from the HMS ERD)
| Table | Key fields | Relationships |
| --- | --- | --- |
| Household | household_id (PK), name, address, created_at | 1 household has N members, N inventory items |
| Member | member_id (PK), household_id (FK), full_name, email, role | N members belong to 1 household |
| Expense | expense_id (PK), paid_by (FK), category, total_amount, expense_date | 1 expense has N expense splits |
| Expense Split | split_id (PK), expense_id (FK), member_id (FK), amount_owed, is_settled | each split says a member owes an amount |
| Chore | chore_id (PK), assigned_to (FK), verified_by (FK), due_date, status | assigned to and verified by members |
| Inventory Item | item_id (PK), household_id (FK), name, quantity, reorder_level | 1 item has N restocks |
| Restock | restock_id (PK), item_id (FK), expense_id (FK, optional), qty_added, restock_date | optionally linked to an expense |

## Folders
- `src/` application code
- `tests/` automated and manual test cases
- `docs/` project documents
