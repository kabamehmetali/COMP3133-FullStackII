const mongoose = require('mongoose');
const User = require('../models/User');
const data = require('../users.json'); 

mongoose.connect('mongodb://127.0.0.1:27017/lab4_users_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB. Seeding data...');

  try {
    await User.deleteMany({});
    await User.insertMany(data);
    console.log('Data inserted successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  }
});
