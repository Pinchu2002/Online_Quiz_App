export interface Question {
  id: number;
  text: string;
  options: {
    id: number;
    text: string;
  }[];
}

export interface SubmitResponse {
  total_questions: number;
  correct: number;
  score_percent: number;
  details: Record<number, boolean>;
  correct_answers: Record<number, number>;
}