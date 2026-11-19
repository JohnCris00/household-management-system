(function () {
  const page = document.body.dataset.page;
  const $ = (id) => document.getElementById(id);

  async function api(method, url, body) {
    const res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'same-origin',
    });
    let data = {};
    try { data = await res.json(); } catch (e) { /* no body */ }
    if (!res.ok) {
      if (res.status === 401 && (page === 'dashboard' || page === 'profile')) {
        window.location.href = '/login';
      }
      const err = new Error(data.error || 'Something went wrong.');
      err.status = res.status;
      throw err;
    }
    return data;
  }

  function showMsg(text, type) {
    const el = $('msg');
    el.textContent = text; // textContent, never innerHTML (prevents XSS)
    el.className = 'msg ' + type;
    el.hidden = false;
  }
  const formData = (form) => Object.fromEntries(new FormData(form).entries());
  const peso = (n) => '\u20B1' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function wireLogout() {
    const btn = $('logout-btn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      try { await api('POST', '/api/auth/logout'); } catch (e) { /* ignore */ }
      window.location.href = '/login';
    });
  }

  function submitForm(form, handler) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try { await handler(formData(form)); }
      catch (err) { showMsg(err.message, 'error'); }
      finally { btn.disabled = false; }
    });
  }

  if (page === 'login') {
    submitForm($('login-form'), async (d) => {
      if (!d.email || !d.password) throw new Error('Enter your email and password.');
      await api('POST', '/api/auth/login', d);
      window.location.href = '/dashboard';
    });
  }

  if (page === 'register') {
    submitForm($('register-form'), async (d) => {
      if (d.password !== d.confirm) throw new Error('Passwords do not match.');
      await api('POST', '/api/auth/register', { full_name: d.full_name, email: d.email, password: d.password });
      window.location.href = '/dashboard';
    });
  }

  if (page === 'dashboard') {
    wireLogout();
    api('GET', '/api/dashboard').then((d) => {
      $('welcome').textContent = 'Hi, ' + d.member.full_name.split(' ')[0] + '!';
      $('household').textContent = d.member.household_name
        ? 'Household: ' + d.member.household_name
        : 'You are not in a household yet. Create or join one to start sharing expenses, chores and supplies.';
      $('stat-chores').textContent = d.stats.open_chores;
      $('stat-owe').textContent = peso(d.stats.you_owe);
      $('stat-owed').textContent = peso(d.stats.owed_to_you);
      $('stat-low').textContent = d.stats.low_stock;

      const list = $('chore-list');
      const today = new Date().toISOString().slice(0, 10);
      d.upcoming_chores.forEach((c) => {
        const li = document.createElement('li');
        const title = document.createElement('span');
        title.textContent = c.title;
        const meta = document.createElement('span');
        meta.className = 'tag' + (c.due_date < today ? ' overdue' : '');
        meta.textContent = (c.due_date < today ? 'Overdue - ' : 'Due ') + c.due_date + ' - ' + c.status;
        li.append(title, meta);
        list.appendChild(li);
      });
      $('chore-empty').hidden = d.upcoming_chores.length > 0;
    }).catch((err) => { if (err.status !== 401) showMsg(err.message, 'error'); });
  }

  if (page === 'profile') {
    wireLogout();
    const form = $('profile-form');
    api('GET', '/api/profile').then((p) => {
      form.elements.full_name.value = p.full_name;
      form.elements.email.value = p.email;
    }).catch((err) => { if (err.status !== 401) showMsg(err.message, 'error'); });

    submitForm(form, async (d) => {
      if (d.new_password && !d.current_password) throw new Error('Enter your current password to set a new one.');
      await api('PUT', '/api/profile', d);
      form.elements.current_password.value = '';
      form.elements.new_password.value = '';
      showMsg('Profile updated.', 'success');
    });
  }
})();
