export type CorrectMap = Record<number, number>;
export type Answers = Record<number, number | null>;
export type Details = Record<number, boolean>;

export function scoreQuiz(correctMap: CorrectMap, answers: Answers): { total: number; correct: number; details: Details } {
  const total = Object.keys(correctMap).length;
  const details: Details = {};
  for (const k of Object.keys(correctMap)) {
    const qid = Number(k);
    const correctOpt = correctMap[qid];
    const userChoice = answers[qid] ?? null;
    details[qid] = (userChoice === correctOpt);
  }
  const correct = Object.values(details).filter(Boolean).length;
  return { total, correct, details };
}
