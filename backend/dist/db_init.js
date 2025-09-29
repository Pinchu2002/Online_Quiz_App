"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const DB_PATH = path_1.default.join(__dirname, '..', 'quiz.db');
function seed() {
    const db = new better_sqlite3_1.default(DB_PATH);
    db.exec('PRAGMA foreign_keys = ON');
    // Clear (for idempotence)
    db.exec('DELETE FROM options; DELETE FROM questions;');
    const sample = [
        { text: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], correctIndex: 2 },
        { text: '2 + 2 * 2 = ?', options: ['6', '8', '4', 'None'], correctIndex: 0 },
        { text: 'Which language runs in a browser?', options: ['Python', 'C++', 'JavaScript', 'Java'], correctIndex: 2 }
    ];
    const insertQ = db.prepare('INSERT INTO questions (text, correct_option_id) VALUES (?, ?)');
    const insertOpt = db.prepare('INSERT INTO options (question_id, text) VALUES (?, ?)');
    for (const q of sample) {
        const qInfo = insertQ.run(q.text, -1);
        const qid = Number(qInfo.lastInsertRowid);
        const optIds = [];
        for (const opt of q.options) {
            const oInfo = insertOpt.run(qid, opt);
            optIds.push(Number(oInfo.lastInsertRowid));
        }
        const correctOptId = optIds[q.correctIndex];
        db.prepare('UPDATE questions SET correct_option_id = ? WHERE id = ?').run(correctOptId, qid);
    }
    db.close();
    console.log('Seeded DB at', DB_PATH);
}
// Ensure schema exists then seed
(function main() {
    db_1.QuizDB.initSchemaAndSeed(DB_PATH);
    seed();
})();
