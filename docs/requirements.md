# Household Management System (HMS) - Requirements & Feature Backlog

## 1. Project Proposal & Scope
* **Problem:** Shared households often run on informal agreements or guesswork, causing frequent disputes over money, unassigned chores, and depleted supplies[cite: 3].
* **Solution:** A centralized web platform unifying expense splitting, chore tracking with peer verification, and live inventory management[cite: 3].
* **Target Users:** Housemates/roommates sharing living spaces and expenses[cite: 3].

---

## 2. Epics & Features Breakdown (5 Epics, 12 Features)

### Epic 1: User Authentication & Household Management
* **Feature 1:** User Registration & Login
  * **User Story:** *As a user, I want to create an account and log in securely so that my household data remains private.*
  * **MoSCoW Priority:** Must Have
  * **Acceptance Criteria:** 
    * Passwords must be hashed.
    * Successful login redirects to the household dashboard.
  * **Dependencies:** None[cite: 1]
* **Feature 2:** Household Creation & Member Invites
  * **User Story:** *As a user, I want to create a household and invite housemates via link or code.*
  * **MoSCoW Priority:** Must Have[cite: 1]
  * **Acceptance Criteria:** Generates a unique invite code tied to the household ID.

### Epic 2: Chores Module (Assigned to Cris)
* **Feature 3:** Chore Creation & Assignment
  * **User Story:** *As a housemate, I want to create a chore and assign it to a member with a due date so responsibilities are clear.*
  * **MoSCoW Priority:** Must Have[cite: 1]
  * **Acceptance Criteria:** Form captures title, description, assignee, and due date with status set to 'Pending'[cite: 3].
  * **Dependencies:** User & Household tables
* **Feature 4:** Chore Completion Submission
  * **User Story:** *As an assignee, I want to mark a chore as completed so it can be verified.*
  * **MoSCoW Priority:** Must Have[cite: 1]
  * **Acceptance Criteria:** Status updates to 'Awaiting Verification' and records completion timestamp[cite: 3].
* **Feature 5:** Peer Verification & Approval
  * **User Story:** *As a housemate, I want to review and approve/reject completed chores to ensure quality.*
  * **MoSCoW Priority:** Should Have[cite: 1]
  * **Acceptance Criteria:** Verifier can approve (status 'Approved') or reject with remarks[cite: 3].

### Epic 3: Expenses & Bill Splitting (Assigned to Francis Jake)
* **Feature 6:** Expense Logging
  * **User Story:** *As a user, I want to record shared bills and attach amounts.*
  * **MoSCoW Priority:** Must Have[cite: 1]
  * **Acceptance Criteria:** Saves total cost, payer, and description.
* **Feature 7:** Automated Bill Splitting
  * **User Story:** *As a user, I want expenses split evenly among household members.*
  * **MoSCoW Priority:** Must Have[cite: 1]
  * **Acceptance Criteria:** Calculates individual balances accurately.
* **Feature 8:** Settlement Tracking
  * **User Story:** *As a user, I want to mark debts as paid when settled.*
  * **MoSCoW Priority:** Should Have[cite: 1]
  * **Acceptance Criteria:** Updates payment status from pending to settled.

### Epic 4: Inventory & Supplies (Assigned to Vince Jayson)
* **Feature 9:** Item Stock Logging
  * **User Story:** *As a user, I want to log household items and quantities.*
  * **MoSCoW Priority:** Must Have[cite: 1]
  * **Acceptance Criteria:** Tracks item name, quantity, and location.
* **Feature 10:** Low Stock Alerts
  * **User Story:** *As a user, I want to get notified when household supplies are running low.*
  * **MoSCoW Priority:** Could Have[cite: 1]
  * **Acceptance Criteria:** Triggers notification when stock falls below threshold.
* **Feature 11:** Restock History
  * **User Story:** *As a user, I want to view who last restocked an item.*
  * **MoSCoW Priority:** Should Have[cite: 1]
  * **Acceptance Criteria:** Logs restock timestamps and user IDs.

### Epic 5: Dashboard & Activity History
* **Feature 12:** Centralized Activity Feed
  * **User Story:** *As a user, I want to view a timeline of recent chores, expenses, and inventory changes.*
  * **MoSCoW Priority:** Should Have[cite: 1]
  * **Acceptance Criteria:** Displays chronological list of household events.