// Protects routes: API calls get a 401 JSON error, pages redirect to /login.
function requireLogin(req, res, next) {
  if (req.session && req.session.memberId) return next();
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(401).json({ error: 'Please log in.' });
  }
  return res.redirect('/login');
}

// Keeps logged-in users away from /login and /register.
function guestOnly(req, res, next) {
  if (req.session && req.session.memberId) return res.redirect('/dashboard');
  return next();
}

module.exports = { requireLogin, guestOnly };
