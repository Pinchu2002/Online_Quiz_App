class IQuizService {
  async getQuizForUser(quizId) {
    throw new Error('Method not implemented');
  }

  async submitAnswers(quizId, answers) {
    throw new Error('Method not implemented');
  }

  async validateAnswers(answers) {
    throw new Error('Method not implemented');
  }
}

module.exports = IQuizService;
