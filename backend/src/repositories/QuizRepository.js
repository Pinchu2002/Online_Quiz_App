const IQuizRepository = require('./interfaces/IQuizRepository');

class QuizRepository extends IQuizRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findById(quizId) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM quizzes WHERE id = ?', [quizId], (err, row) => {
        if (err) return reject(err);
        // Set time_limit to 60 seconds (1 minute) if not already set
        if (row) {
          row.time_limit = 60; // Force 1 minute time limit
        }
        resolve(row);
      });
    });
  }

  async getQuestionsForQuiz(quizId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT q.id, q.text, q.correct_option_id, q.points, q.order_index,
               o.id as option_id, o.text as option_text, o.order_index as option_order
        FROM questions q
        JOIN options o ON q.id = o.question_id
        WHERE q.quiz_id = ?
        ORDER BY q.order_index, o.order_index;
      `;
      this.db.all(query, [quizId], (err, rows) => {
        if (err) return reject(err);
        const questions = {};
        rows.forEach(row => {
          if (!questions[row.id]) {
            questions[row.id] = {
              id: row.id,
              text: row.text,
              correctOptionId: row.correct_option_id,
              points: row.points || 10,
              order: row.order_index,
              options: [],
            };
          }
          questions[row.id].options.push({ 
            id: row.option_id, 
            text: row.option_text,
            order: row.option_order
          });
        });
        resolve(Object.values(questions));
      });
    });
  }

  async saveAttempt(attempt) {
    const db = this.db; // Store reference to db
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION', (err) => {
          if (err) return reject(err);

          const { quizId, score, totalQuestions, correctAnswers } = attempt;
          const stmt = db.prepare('INSERT INTO user_attempts (quiz_id, score, total_questions, correct_answers) VALUES (?, ?, ?, ?)');
          
          stmt.run(quizId, score, totalQuestions, correctAnswers, function(err) {
            if (err) {
              db.run('ROLLBACK');
              stmt.finalize();
              return reject(err);
            }
            
            const attemptId = this.lastID;
            const answerStmt = db.prepare('INSERT INTO user_answers (attempt_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)');
            
            // Process all answers
            const processAnswers = (index) => {
              if (index >= attempt.answers.length) {
                answerStmt.finalize((err) => {
                  if (err) {
                    db.run('ROLLBACK');
                    return reject(err);
                  }
                  db.run('COMMIT', (err) => {
                    if (err) return reject(err);
                    resolve({ ...attempt, id: attemptId });
                  });
                });
                return;
              }
              
              const answer = attempt.answers[index];
              answerStmt.run(
                attemptId, 
                answer.questionId, 
                answer.selectedOptionId, 
                answer.isCorrect,
                (err) => {
                  if (err) {
                    db.run('ROLLBACK');
                    answerStmt.finalize();
                    return reject(err);
                  }
                  processAnswers(index + 1);
                }
              );
            };
            
            processAnswers(0);
          });
          
          stmt.finalize();
        });
      });
    });
  }

  async getAttemptById(attemptId) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM user_attempts WHERE id = ?', [attemptId], (err, row) => {
        if (err) return reject(err);
        // you might want to fetch answers as well
        resolve(row);
      });
    });
  }

  async getAnswersForAttempt(attemptId) {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM user_answers WHERE attempt_id = ?', [attemptId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = QuizRepository;
