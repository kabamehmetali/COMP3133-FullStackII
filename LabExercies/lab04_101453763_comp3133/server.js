const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/lab4_users_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB: lab4_users_database');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
