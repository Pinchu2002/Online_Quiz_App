import api from './api.service';

export const fetchQuiz = async (quizId) => {
  const response = await api.get(`/quiz/${quizId}`);
  return response.data;
};

export const submitQuiz = async (quizId, answers) => {
  const response = await api.post(`/quiz/${quizId}/submit`, { answers });
  return response.data;
};
