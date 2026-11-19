require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const { requireLogin, guestOnly } = require('./middleware/auth');

if (!process.env.SESSION_SECRET) {
  console.error('Missing SESSION_SECRET. Copy .env.example to .env and set it.');
  process.exit(1);
}

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const view = (name) => (req, res) => res.sendFile(path.join(__dirname, '..', 'views', name));

app.disable('x-powered-by');
if (isProd) app.set('trust proxy', 1);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', secure: isProd, maxAge: 1000 * 60 * 60 * 8 },
  })
);
app.use(express.static(path.join(__dirname, '..', 'public')));

// Pages
app.get('/', (req, res) => res.redirect(req.session.memberId ? '/dashboard' : '/login'));
app.get('/login', guestOnly, view('login.html'));
app.get('/register', guestOnly, view('register.html'));
app.get('/dashboard', requireLogin, view('dashboard.html'));
app.get('/profile', requireLogin, view('profile.html'));

// API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', requireLogin, require('./routes/profile'));
app.use('/api/dashboard', requireLogin, require('./routes/dashboard'));

app.use((req, res) => res.status(404).send('Not found'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid request body.' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Server error. Please try again.' });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`HMS running at http://localhost:${port}`));
