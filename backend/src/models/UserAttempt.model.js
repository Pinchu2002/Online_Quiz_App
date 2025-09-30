class UserAttempt {
  constructor(id, quizId, answers, score, totalQuestions, correctAnswers, completedAt) {
    this.id = id;
    this.quizId = quizId;
    this.answers = answers;
    this.score = score;
    this.totalQuestions = totalQuestions;
    this.correctAnswers = correctAnswers;
    this.completedAt = completedAt;
  }
}

module.exports = UserAttempt;
