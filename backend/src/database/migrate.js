const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Get database path from config
const config = require('../config/database.config');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

console.log(`Running migrations for ${env} environment`);
console.log(`Database path: ${dbConfig.storage}`);
console.log(`Current working directory: ${process.cwd()}`);

// Ensure database directory exists
const dbDir = path.dirname(dbConfig.storage);
if (!fs.existsSync(dbDir) && dbDir !== '.') {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`Created database directory: ${dbDir}`);
}

// Create database connection
const db = new sqlite3.Database(dbConfig.storage, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the SQLite database.');
});

// Run migration
const runMigration = () => {
  return new Promise((resolve, reject) => {
    const schemaPath = path.join(__dirname, 'migrations', '001_initial_schema.sql');
    
    console.log(`Looking for schema file at: ${schemaPath}`);
    
    if (!fs.existsSync(schemaPath)) {
      reject(new Error(`Schema file not found: ${schemaPath}`));
      return;
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    db.exec(schema, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('✅ Database schema created successfully');
        resolve();
      }
    });
  });
};

// Run seed data (optional)
const runSeed = () => {
  return new Promise((resolve, reject) => {
    const seedPath = path.join(__dirname, 'seeds', 'sample_quiz.sql');
    
    if (!fs.existsSync(seedPath)) {
      console.log('⚠️  No seed file found, skipping seed data');
      resolve();
      return;
    }

    const seed = fs.readFileSync(seedPath, 'utf8');
    
    db.exec(seed, (err) => {
      if (err) {
        console.error('⚠️  Error running seed data:', err.message);
        // Don't reject, seed is optional
        resolve();
      } else {
        console.log('✅ Seed data inserted successfully');
        resolve();
      }
    });
  });
};

// Main migration process
const migrate = async () => {
  try {
    console.log('Starting migration process...');
    await runMigration();
    
    // Only run seed in development or if explicitly requested
    if (env === 'development' || process.env.RUN_SEED === 'true') {
      await runSeed();
    } else {
      console.log('Skipping seed data in production');
    }
    
    console.log('✅ Migration completed successfully');
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
        process.exit(1);
      }
      console.log('Database connection closed');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Error stack:', error.stack);
    db.close();
    process.exit(1);
  }
};

// Run migration
migrate();
