const IQuestionRepository = require('./interfaces/IQuestionRepository');

class QuestionRepository extends IQuestionRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findById(questionId) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM questions WHERE id = ?', [questionId], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  async findByQuizId(quizId) {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM questions WHERE quiz_id = ?', [quizId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = QuestionRepository;
