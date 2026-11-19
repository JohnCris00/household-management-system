const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/profile
router.get('/', async (req, res) => {
  const [rows] = await db.execute(
    'SELECT member_id, full_name, email, role, household_id FROM member WHERE member_id = ?',
    [req.session.memberId]
  );
  if (!rows.length) return res.status(401).json({ error: 'Please log in.' });
  return res.json(rows[0]);
});

// PUT /api/profile  (name, email, and optionally a new password)
router.put('/', async (req, res) => {
  const id = req.session.memberId;
  const fullName = String(req.body.full_name || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const currentPassword = String(req.body.current_password || '');
  const newPassword = String(req.body.new_password || '');

  if (fullName.length < 2 || fullName.length > 100) {
    return res.status(400).json({ error: 'Full name must be 2 to 100 characters.' });
  }
  if (!EMAIL_RE.test(email) || email.length > 150) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }

  const [taken] = await db.execute(
    'SELECT member_id FROM member WHERE email = ? AND member_id <> ?',
    [email, id]
  );
  if (taken.length) {
    return res.status(409).json({ error: 'That email is used by another account.' });
  }

  let newHash = null;
  if (newPassword) {
    if (newPassword.length < 8 || newPassword.length > 72) {
      return res.status(400).json({ error: 'New password must be 8 to 72 characters.' });
    }
    const [rows] = await db.execute('SELECT password_hash FROM member WHERE member_id = ?', [id]);
    const valid = rows.length && (await bcrypt.compare(currentPassword, rows[0].password_hash));
    if (!valid) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }
    newHash = await bcrypt.hash(newPassword, 10);
  }

  try {
    if (newHash) {
      await db.execute(
        'UPDATE member SET full_name = ?, email = ?, password_hash = ? WHERE member_id = ?',
        [fullName, email, newHash, id]
      );
    } else {
      await db.execute('UPDATE member SET full_name = ?, email = ? WHERE member_id = ?', [
        fullName,
        email,
        id,
      ]);
    }
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'That email is used by another account.' });
    }
    throw err;
  }
  return res.json({ ok: true, full_name: fullName, email });
});

module.exports = router;
