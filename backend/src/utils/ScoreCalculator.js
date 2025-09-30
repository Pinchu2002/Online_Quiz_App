class ScoreCalculator {
  static calculate(correctCount, totalCount) {
    if (totalCount === 0) {
      return 0;
    }
    return (correctCount / totalCount) * 100;
  }

  static calculatePercentage(score, total) {
    if (total === 0) {
      return 0;
    }
    return (score / total) * 100;
  }

  static getGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }
}

module.exports = ScoreCalculator;
