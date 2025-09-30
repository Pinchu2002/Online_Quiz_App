const ScoreCalculator = require('../../../src/utils/ScoreCalculator');

describe('ScoreCalculator', () => {
  it('should calculate percentage correctly', () => {
    expect(ScoreCalculator.calculatePercentage(80, 100)).toBe(80);
  });
});
