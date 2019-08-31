const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Database is connected');
  } catch (error) {
    console.log('Database connection problem');
    process.exit(1);
  }
}

module.exports = connect;
