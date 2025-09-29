import { QuizDB } from './db';
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '..', 'quiz.db');

function seed() {
  const db = new Database(DB_PATH);
  db.exec('PRAGMA foreign_keys = ON');

  // Clear (for idempotence)
  db.exec('DELETE FROM options; DELETE FROM questions;');

  const sample = [
    { text: 'What is the capital of France?', options: ['Berlin','Madrid','Paris','Rome'], correctIndex: 2 },
    { text: '2 + 2 * 2 = ?', options: ['6','8','4','None'], correctIndex: 0 },
    { text: 'Which language runs in a browser?', options: ['Python','C++','JavaScript','Java'], correctIndex: 2 }
  ];

  const insertQ = db.prepare('INSERT INTO questions (text, correct_option_id) VALUES (?, ?)');
  const insertOpt = db.prepare('INSERT INTO options (question_id, text) VALUES (?, ?)');

  for (const q of sample) {
    const qInfo = insertQ.run(q.text, -1);
    const qid = Number(qInfo.lastInsertRowid);

    const optIds: number[] = [];
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
  QuizDB.initSchemaAndSeed(DB_PATH);
  seed();
})();
