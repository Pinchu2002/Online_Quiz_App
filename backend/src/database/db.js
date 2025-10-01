const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const config = require('../config/database.config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

console.log(`Environment: ${env}`);
console.log(`Database path: ${dbConfig.storage}`);
console.log(`ENABLE_SEED env var: ${process.env.ENABLE_SEED}`);
console.log(`Should seed: ${env === 'development' || process.env.ENABLE_SEED === 'true'}`);

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
        // Check if data exists
        checkAndSeedData();
      }
    });
  }
});

// Function to check if data exists and seed if needed
function checkAndSeedData() {
  console.log(`Checking if seed data needed... (env: ${env}, ENABLE_SEED: ${process.env.ENABLE_SEED})`);
  if (env === 'development' || process.env.ENABLE_SEED === 'true') {
    db.get("SELECT COUNT(*) as count FROM quizzes", (err, row) => {
      if (err) {
        console.error('Error checking quiz data:', err.message);
      } else if (row.count === 0) {
        console.log('⚠️  No quiz data found, inserting seed data...');
        runSeedData();
      } else {
        console.log(`✅ Database has ${row.count} quiz(es)`);
      }
    });
  } else {
    console.log('⚠️  Seed data check skipped (not in dev mode and ENABLE_SEED not true)');
  }
}

// Function to run seed data
function runSeedData() {
  const seedPath = path.join(__dirname, 'seeds', 'sample_quiz.sql');
  console.log(`Looking for seed file at: ${seedPath}`);
  
  if (fs.existsSync(seedPath)) {
    console.log('✅ Seed file found, reading...');
    const seed = fs.readFileSync(seedPath, 'utf8');
    console.log(`Seed file size: ${seed.length} bytes`);
    
    db.exec(seed, (err) => {
      if (err) {
        console.error('⚠️  Error inserting seed data:', err.message);
      } else {
        console.log('✅ Seed data inserted successfully');
      }
    });
  } else {
    console.error('❌ Seed file not found:', seedPath);
  }
}

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
      
      // Run seed data after creating tables
      console.log(`Checking if should seed after migration... (env: ${env}, ENABLE_SEED: ${process.env.ENABLE_SEED})`);
      if (env === 'development' || process.env.ENABLE_SEED === 'true') {
        console.log('✅ Conditions met, running seed data...');
        runSeedData();
      } else {
        console.log('⚠️  Seed data skipped (not in dev mode and ENABLE_SEED not true)');
      }
    }
  });
}

module.exports = db;
