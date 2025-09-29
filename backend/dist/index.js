"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./db");
const scoring_1 = require("./scoring");
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const db = new db_1.QuizDB();
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
    const answers = {};
    for (const k of Object.keys(correctMap)) {
        const qid = Number(k);
        const raw = payload.answers[qid] ?? payload.answers[String(qid)] ?? null;
        answers[qid] = raw === null ? null : Number(raw);
    }
    const scored = (0, scoring_1.scoreQuiz)(correctMap, answers); // { total, correct, details }
    const percent = scored.total ? Math.round((scored.correct / scored.total) * 10000) / 100 : 0;
    res.json({ total_questions: scored.total, correct: scored.correct, score_percent: percent, details: scored.details });
});
app.listen(PORT, () => console.log(`Quiz API listening at http://localhost:${PORT}/api`));
