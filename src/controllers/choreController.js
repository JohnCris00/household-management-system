const ChoreManager = require('../chores');

const db = {
    execute: async (query, params) => {
        console.log('Executing query:', query, 'with params:', params);
        return [{ affectedRows: 1 }];
    }
};

const choreManager = new ChoreManager(db);

const createChore = async (req, res) => {
    try {
        const { householdId, title, description, assignedTo, dueDate } = req.body;
        const result = await choreManager.createChore(householdId, title, description, assignedTo, dueDate);
        res.status(201).json({ message: 'Chore created successfully', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const markAsDone = async (req, res) => {
    try {
        const { id } = req.params;
        const { memberId } = req.body;
        const result = await choreManager.markChoreAsDone(id, memberId);
        res.json({ message: 'Chore submitted for verification', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyChore = async (req, res) => {
    try {
        const { id } = req.params;
        const { verifierId, decision, remarks } = req.body;
        const result = await choreManager.verifyChore(id, verifierId, decision, remarks);
        res.json({ message: `Chore marked as ${decision}`, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createChore,
    markAsDone,
    verifyChore
};