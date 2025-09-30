class Question {
  constructor(id, quizId, text, options, correctOptionId, points, order) {
    this.id = id;
    this.quizId = quizId;
    this.text = text;
    this.options = options;
    this.correctOptionId = correctOptionId;
    this.points = points;
    this.order = order;
  }

  isCorrectAnswer(optionId) {
    return this.correctOptionId === optionId;
  }

  getOptionsForDisplay() {
    // Return options without the correct answer hint
    return this.options;
  }

  validate() {
    // Basic validation
    return this.id && this.quizId && this.text && this.options.length > 0;
  }
}

module.exports = Question;
