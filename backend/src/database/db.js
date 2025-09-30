const sqlite3 = require('sqlite3').verbose();
const config = require('../config/database.config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const db = new sqlite3.Database(dbConfig.storage, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;
