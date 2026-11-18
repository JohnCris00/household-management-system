# Household Management System (HMS)

Expenses, chores, and supplies - in one place.

## Summary
HMS is a web application for shared households (apartments, boarding houses). It replaces group chats and guesswork with one shared, relational-database-backed record.

## Problem
- **Money:** who paid, who owes, was it settled? Payments are logged informally or not at all.
- **Chores:** tasks are assigned verbally, with no clear owner and no proof of completion.
- **Supplies:** groceries and consumables are untracked, so items run out or are bought twice.

## Users
Housemates in a shared household; the household owner manages members.

## Features
- **PLT-01** Database schema and seed data (Must)
- **ACC-01** User registration and login (Must)
- **ACC-02** Create household and add members (Must)
- **ACC-03** Member roles and profile (Should)
- **EXP-01** Record an expense (Must)
- **EXP-02** Categorize and filter expenses (Should)
- **EXP-03** Split an expense (Must)
- **EXP-04** Settle splits and show who owes whom (Must)
- **CHR-01** Create and assign a chore (Must)
- **CHR-02** Mark a chore as done (Must)
- **CHR-03** Verify or reject a chore (Must)
- **CHR-04** Chore list with status and overdue highlight (Should)
- **CHR-05** Recurring chores (Could)
- **INV-01** Add and edit inventory items (Must)
- **INV-02** Low-stock flag (Must)
- **INV-03** Log a restock (optionally link to expense) (Should)
- **RPT-01** Household dashboard (Should)
- **RPT-02** Reminders for due chores and low stock (Could)

See `docs/requirements.md` for user stories and acceptance criteria.

## Tech stack
TODO: fill in your actual stack (front end, back end, database) once agreed. The system is a web app backed by a relational database (see `docs/architecture.md`).

## Team
| Member | Role |
| --- | --- |
| Francis Jake Barrera | TODO |
| Vince Jayson Cabag | TODO |
| John Cris Cabusas | TODO |

College of Computer Studies, Department of Information Technology, Cebu Institute of Technology - University.

## Setup
1. Clone the repo: `git clone <repo-url>` and `cd hms`
2. Copy `.env.example` to `.env` and fill in your own values (never commit `.env`).
3. TODO: install dependencies and run the app (add the commands for your stack).
4. TODO: run tests from `tests/`.

## Task board
TODO: paste your Trello/ClickUp board link here.

## Contributing
Read `CONTRIBUTING.md` before opening a pull request.
