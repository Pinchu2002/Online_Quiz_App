const fs = require('fs');
const path = require('path');
const db = require('../src/database/db');

const migrationFile = path.join(__dirname, '../src/database/migrations/001_initial_schema.sql');
const schema = fs.readFileSync(migrationFile, 'utf8');

db.exec(schema, (err) => {
  if (err) {
    console.error('Error running migration', err.message);
  } else {
    console.log('Migration completed successfully.');
  }
  db.close();
});
