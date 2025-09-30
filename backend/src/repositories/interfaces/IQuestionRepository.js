class IQuestionRepository {
  async findById(questionId) {
    throw new Error('Method not implemented');
  }

  async findByQuizId(quizId) {
    throw new Error('Method not implemented');
  }
}

module.exports = IQuestionRepository;
