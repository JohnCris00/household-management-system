const express = require('express');
const db = require('../db');

const router = express.Router();

// GET /api/dashboard - summary for the logged-in member
router.get('/', async (req, res) => {
  const id = req.session.memberId;

  const [meRows] = await db.execute(
    `SELECT m.member_id, m.full_name, m.email, m.role, m.household_id, h.name AS household_name
       FROM member m LEFT JOIN household h ON h.household_id = m.household_id
      WHERE m.member_id = ?`,
    [id]
  );
  if (!meRows.length) {
    return req.session.destroy(() => res.status(401).json({ error: 'Please log in.' }));
  }
  const me = meRows[0];

  const [[chores]] = await db.execute(
    "SELECT COUNT(*) AS n FROM chore WHERE assigned_to = ? AND status <> 'Verified'",
    [id]
  );
  const [[owe]] = await db.execute(
    `SELECT COALESCE(SUM(s.amount_owed), 0) AS total
       FROM expense_split s JOIN expense e ON e.expense_id = s.expense_id
      WHERE s.member_id = ? AND e.paid_by <> ? AND s.is_settled = 0`,
    [id, id]
  );
  const [[owed]] = await db.execute(
    `SELECT COALESCE(SUM(s.amount_owed), 0) AS total
       FROM expense_split s JOIN expense e ON e.expense_id = s.expense_id
      WHERE e.paid_by = ? AND s.member_id <> ? AND s.is_settled = 0`,
    [id, id]
  );
  let lowStock = 0;
  if (me.household_id) {
    const [[low]] = await db.execute(
      'SELECT COUNT(*) AS n FROM inventory_item WHERE household_id = ? AND quantity <= reorder_level',
      [me.household_id]
    );
    lowStock = low.n;
  }
  const [upcoming] = await db.execute(
    `SELECT chore_id, title, due_date, status FROM chore
      WHERE assigned_to = ? AND status <> 'Verified'
      ORDER BY due_date ASC LIMIT 5`,
    [id]
  );

  return res.json({
    member: {
      full_name: me.full_name,
      email: me.email,
      role: me.role,
      household_id: me.household_id,
      household_name: me.household_name,
    },
    stats: {
      open_chores: chores.n,
      you_owe: Number(owe.total),
      owed_to_you: Number(owed.total),
      low_stock: lowStock,
    },
    upcoming_chores: upcoming,
  });
});

module.exports = router;
