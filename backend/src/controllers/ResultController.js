class ResultController {
  constructor(quizService) {
    this.quizService = quizService;
  }

  async getResults(req, res, next) {
    try {
      const { attemptId } = req.params;
      const results = await this.quizService.getDetailedResults(attemptId);
      res.json({ success: true, data: results });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ResultController;
