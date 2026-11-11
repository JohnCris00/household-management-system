class ChoreManager {
  constructor(dbConnection) {
    this.db = dbConnection;
  }

  async createChore(householdId, title, description, assignedTo, dueDate) {
    const query = `
      INSERT INTO Chore (household_id, title, description, assigned_to, due_date, status)
      VALUES (?, ?, ?, ?, ?, 'Pending')
    `;
    return await this.db.execute(query, [householdId, title, description, assignedTo, dueDate]);
  }

  async markChoreAsDone(choreId, memberId) {
    const query = `
      UPDATE Chore 
      SET status = 'Awaiting Verification', completed_at = NOW()
      WHERE chore_id = ? AND assigned_to = ?
    `;
    return await this.db.execute(query, [choreId, memberId]);
  }

  async verifyChore(choreId, verifierId, decision, remarks = '') {
    const newStatus = decision === 'Approved' ? 'Approved' : 'Pending';
    const query = `
      UPDATE Chore 
      SET status = ?, verified_by = ?, remarks = ?
      WHERE chore_id = ?
    `;
    return await this.db.execute(query, [newStatus, verifierId, remarks, choreId]);
  }
}

module.exports = ChoreManager;