class IScoringService {
  async calculateScore(answers, questions) {
    throw new Error('Method not implemented');
  }

  async getDetailedResults(answers, questions) {
    throw new Error('Method not implemented');
  }
}

module.exports = IScoringService;