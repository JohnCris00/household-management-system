const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Used to keep login timing similar when the email does not exist.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

// New session id on login/register (prevents session fixation).
function startSession(req, memberId) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) return reject(err);
      req.session.memberId = memberId;
      req.session.save((err2) => (err2 ? reject(err2) : resolve()));
    });
  });
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const fullName = String(req.body.full_name || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (fullName.length < 2 || fullName.length > 100) {
    return res.status(400).json({ error: 'Full name must be 2 to 100 characters.' });
  }
  if (!EMAIL_RE.test(email) || email.length > 150) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  if (password.length < 8 || password.length > 72) {
    return res.status(400).json({ error: 'Password must be 8 to 72 characters.' });
  }

  const [existing] = await db.execute('SELECT member_id FROM member WHERE email = ?', [email]);
  if (existing.length) {
    return res.status(409).json({ error: 'That email is already registered.' });
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    const [result] = await db.execute(
      'INSERT INTO member (full_name, email, password_hash) VALUES (?, ?, ?)',
      [fullName, email, hash]
    );
    await startSession(req, result.insertId);
    return res.status(201).json({ ok: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'That email is already registered.' });
    }
    throw err;
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  const [rows] = await db.execute(
    'SELECT member_id, password_hash FROM member WHERE email = ?',
    [email]
  );
  const member = rows[0];
  const ok = await bcrypt.compare(password, member ? member.password_hash : DUMMY_HASH);

  if (!member || !ok) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  await startSession(req, member.member_id);
  return res.json({ ok: true });
});

// POST /api/auth/logout
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    return res.json({ ok: true });
  });
});

module.exports = router;
