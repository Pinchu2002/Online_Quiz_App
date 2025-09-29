import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { QuizDB } from './db';
import { scoreQuiz } from './scoring';
import path from 'path';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new QuizDB();

app.get('/api/questions', (req, res) => {
  const qs = db.getQuestionsForApi();
  // remove any sensitive fields (correct ids are not in this response)
  res.json(qs);
});

app.post('/api/submit', (req, res) => {
  // expect { answers: { "<qid>": <optionId> | null, ... } }
  const payload = req.body;
  if (!payload || typeof payload !== 'object' || !payload.answers) {
    return res.status(400).json({ error: 'Invalid payload, expected { answers: { [questionId]: optionId|null } }' });
  }
  const correctMap = db.getCorrectMap();
  // Please note payload.answers keys might be strings — coerce:
  const answers: Record<number, number|null> = {};
  for (const k of Object.keys(correctMap)) {
    const qid = Number(k);
    const raw = payload.answers[qid] ?? payload.answers[String(qid)] ?? null;
    answers[qid] = raw === null ? null : Number(raw);
  }

  const scored = scoreQuiz(correctMap, answers); // { total, correct, details }
  const percent = scored.total ? Math.round((scored.correct / scored.total) * 10000) / 100 : 0;
  res.json({
    total_questions: scored.total,
    correct: scored.correct,
    score_percent: percent,
    details: scored.details,
    correct_answers: correctMap
  });
});

app.listen(PORT, () => console.log(`Quiz API listening at http://localhost:${PORT}/api`));
