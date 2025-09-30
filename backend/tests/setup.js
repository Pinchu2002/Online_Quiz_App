const db = require('../src/database/db');

afterAll((done) => {
  db.close(done);
});
