module.exports = {
  development: {
    storage: process.env.DATABASE_PATH || process.env.DB_PATH || 'src/database/quiz.db',
    dialect: 'sqlite',
  },
  test: {
    storage: ':memory:',
    dialect: 'sqlite',
  },
  production: {
    storage: process.env.DATABASE_PATH || process.env.DB_PATH || './database.sqlite',
    dialect: 'sqlite',
  },
};