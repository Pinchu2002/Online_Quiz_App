module.exports = {
  development: {
    storage: process.env.DB_PATH || 'src/database/quiz.db',
    dialect: 'sqlite',
  },
  test: {
    storage: ':memory:',
    dialect: 'sqlite',
  },
  production: {
    storage: process.env.DB_PATH || 'src/database/quiz.db',
    dialect: 'sqlite',
  },
};