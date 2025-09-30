const IQuizService = require('./interfaces/IQuizService');
const { NotFoundError, BusinessLogicError } = require('../utils/ErrorTypes');

class QuizService extends IQuizService {
  constructor(quizRepository, scoringService, validationService) {
    super();
    this.quizRepository = quizRepository;
    this.scoringService = scoringService;
    this.validationService = validationService;
  }

  async getQuizForUser(quizId) {
    const quiz = await this.quizRepository.findById(quizId);
    if (!quiz) {
      throw new NotFoundError('Quiz not found');
    }
    const questions = await this.quizRepository.getQuestionsForQuiz(quizId);
    return { ...quiz, questions };
  }

  async submitAnswers(quizId, answers) {
    const validationResult = this.validationService.validateSubmission({ answers });
    if (validationResult.error) {
      throw new BusinessLogicError('Invalid submission', validationResult.error.details);
    }

    const questions = await this.quizRepository.getQuestionsForQuiz(quizId);
    if (questions.length === 0) {
        throw new NotFoundError('No questions found for this quiz');
    }

    const { score, correctAnswers, detailedAnswers } = await this.scoringService.calculateScore(answers, questions);

    const attempt = {
      quizId,
      answers: detailedAnswers, // now includes isCorrect
      score,
      totalQuestions: questions.length,
      correctAnswers,
      completedAt: new Date(),
    };

    const savedAttempt = await this.quizRepository.saveAttempt(attempt);

    return {
      attemptId: savedAttempt.id,
      score: savedAttempt.score,
      totalQuestions: savedAttempt.totalQuestions,
      correctAnswers: savedAttempt.correctAnswers,
      percentage: (savedAttempt.correctAnswers / savedAttempt.totalQuestions) * 100,
      detailedAnswers: detailedAnswers, // Include detailed answers for review
    };
  }

  async getDetailedResults(attemptId) {
    const attempt = await this.quizRepository.getAttemptById(attemptId);
    if (!attempt) {
        throw new NotFoundError('Attempt not found');
    }
    // This is a simplified version. In a real app, you'd fetch question and answer texts.
    const answers = await this.quizRepository.getAnswersForAttempt(attemptId);
    return { ...attempt, answers };
  }
}

module.exports = QuizService;
