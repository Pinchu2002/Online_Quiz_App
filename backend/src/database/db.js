const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const config = require('../config/database.config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

console.log(`Environment: ${env}`);
console.log(`Database path: ${dbConfig.storage}`);

const db = new sqlite3.Database(dbConfig.storage, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Check if tables exist, if not run migration
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='quizzes'", (err, row) => {
      if (err) {
        console.error('Error checking tables:', err.message);
      } else if (!row) {
        console.log('⚠️  Tables not found, running migration...');
        runMigration();
      } else {
        console.log('✅ Database tables exist');
      }
    });
  }
});

// Function to run migration if tables don't exist
function runMigration() {
  const schemaPath = path.join(__dirname, 'migrations', '001_initial_schema.sql');
  
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Schema file not found:', schemaPath);
    return;
  }

  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  db.exec(schema, (err) => {
    if (err) {
      console.error('❌ Error creating tables:', err.message);
    } else {
      console.log('✅ Database tables created successfully');
      
      // Run seed data in development
      if (env === 'development' || process.env.ENABLE_SEED === 'true') {
        const seedPath = path.join(__dirname, 'seeds', 'sample_quiz.sql');
        if (fs.existsSync(seedPath)) {
          const seed = fs.readFileSync(seedPath, 'utf8');
          db.exec(seed, (err) => {
            if (err) {
              console.error('⚠️  Error inserting seed data:', err.message);
            } else {
              console.log('✅ Seed data inserted');
            }
          });
        }
      }
    }
  });
}

module.exports = db;
