class IQuizRepository {
  async findById(quizId) {
    throw new Error('Method not implemented');
  }

  async getQuestionsForQuiz(quizId) {
    throw new Error('Method not implemented');
  }

  async saveAttempt(attempt) {
    throw new Error('Method not implemented');
  }

  async getAttemptById(attemptId) {
    throw new Error('Method not implemented');
  }

  async getAnswersForAttempt(attemptId) {
    throw new Error('Method not implemented');
  }
}

module.exports = IQuizRepository;
