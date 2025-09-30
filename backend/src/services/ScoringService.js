const IScoringService = require('./interfaces/IScoringService');
const { BusinessLogicError } = require('../utils/ErrorTypes');

class ScoringService extends IScoringService {
  constructor(questionRepository) {
    super();
    this.questionRepository = questionRepository;
  }

  async calculateScore(answers, questions) {
    let score = 0;
    let correctAnswers = 0;
    const detailedAnswers = [];

    for (const answer of answers) {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) {
        throw new BusinessLogicError(`Question with id ${answer.questionId} not found in this quiz.`);
      }

      // In a real app, correctOptionId would be fetched from the database securely.
      // Here we assume the questions object contains it, but it should not be sent to the client.
      const correctOption = await this.questionRepository.findById(question.id);
      const isCorrect = correctOption.correct_option_id === answer.selectedOptionId;

      if (isCorrect) {
        score += question.points || 1;
        correctAnswers++;
      }
      detailedAnswers.push({ ...answer, isCorrect });
    }

    return { score, correctAnswers, detailedAnswers };
  }

  async getDetailedResults(answers, questions) {
    // This can be used to enrich the results with more data if needed
    // For now, the main logic is in calculateScore
    return this.calculateScore(answers, questions);
  }
}

module.exports = ScoringService;