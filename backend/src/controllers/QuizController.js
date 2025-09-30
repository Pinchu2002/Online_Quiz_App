class QuizController {
  constructor(quizService) {
    this.quizService = quizService;
  }

  async getQuiz(req, res, next) {
    try {
      const { quizId } = req.params;
      const quiz = await this.quizService.getQuizForUser(quizId);
      res.json({ success: true, data: quiz });
    } catch (error) {
      next(error);
    }
  }

  async submitQuiz(req, res, next) {
    try {
      const { quizId } = req.params;
      const { answers } = req.body;
      const result = await this.quizService.submitAnswers(quizId, answers);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QuizController;
