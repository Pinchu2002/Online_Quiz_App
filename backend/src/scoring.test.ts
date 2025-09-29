import { scoreQuiz } from './scoring';

test('all correct', () => {
  const correct = { 1: 10, 2: 20 };
  const answers = { 1: 10, 2: 20 };
  const r = scoreQuiz(correct, answers);
  expect(r.total).toBe(2);
  expect(r.correct).toBe(2);
  expect(r.details).toEqual({ 1: true, 2: true });
});

test('partial and missing', () => {
  const correct = { 1: 10, 2: 20, 3: 30 };
  const answers = { 1: 11, 2: 20 }; // missing 3
  const r = scoreQuiz(correct, answers);
  expect(r.total).toBe(3);
  expect(r.correct).toBe(1);
  expect(r.details[1]).toBe(false);
  expect(r.details[2]).toBe(true);
  expect(r.details[3]).toBe(false);
});
