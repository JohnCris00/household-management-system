const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const choreRoutes = require('./routes/choreRoutes');
app.use('/api/chores', choreRoutes);

app.get('/', (req, res) => {
    res.send('Household Management System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});