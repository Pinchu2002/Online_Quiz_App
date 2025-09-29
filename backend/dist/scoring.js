"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreQuiz = scoreQuiz;
function scoreQuiz(correctMap, answers) {
    const total = Object.keys(correctMap).length;
    const details = {};
    for (const k of Object.keys(correctMap)) {
        const qid = Number(k);
        const correctOpt = correctMap[qid];
        const userChoice = answers[qid] ?? null;
        details[qid] = (userChoice === correctOpt);
    }
    const correct = Object.values(details).filter(Boolean).length;
    return { total, correct, details };
}
