class Quiz {
  constructor(id, title, description, timeLimit, totalQuestions, totalPoints) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timeLimit = timeLimit;
    this.totalQuestions = totalQuestions;
    this.totalPoints = totalPoints;
    this.questions = [];
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  removeQuestion(questionId) {
    this.questions = this.questions.filter(q => q.id !== questionId);
  }

  getTotalQuestions() {
    return this.questions.length;
  }

  validate() {
    return this.id && this.title && this.questions.length > 0;
  }
}

module.exports = Quiz;
