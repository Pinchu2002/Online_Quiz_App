const fs = require('fs');
const path = require('path');
const db = require('../src/database/db');

const seedFile = path.join(__dirname, '../src/database/seeds/sample_quiz.sql');
const seedSql = fs.readFileSync(seedFile, 'utf8');

db.exec(seedSql, (err) => {
  if (err) {
    console.error('Error running seed', err.message);
  } else {
    console.log('Seed completed successfully.');
  }
  db.close();
});
