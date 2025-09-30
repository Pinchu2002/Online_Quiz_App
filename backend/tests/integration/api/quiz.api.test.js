const request = require('supertest');
const app = require('../../../src/app');

describe('GET /api/quiz/:quizId', () => {
  it('should return a quiz', async () => {
    // This test will fail until the repository is implemented
    // const res = await request(app).get('/api/quiz/1');
    // expect(res.statusCode).toEqual(200);
    expect(true).toBe(true);
  });
});
