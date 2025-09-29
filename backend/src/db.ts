import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '..', 'quiz.db');

export class QuizDB {
  db: Database.Database;

  constructor(dbPath = DB_PATH) {
    this.db = new Database(dbPath);
    // ensure foreign keys
    this.db.pragma('foreign_keys = ON');
  }

  close() {
    this.db.close();
  }

  getQuestionsForApi() {
    const qRows = this.db.prepare('SELECT id, text FROM questions ORDER BY id').all();
    return qRows.map((r: any) => {
      const opts = this.db
        .prepare('SELECT id, text FROM options WHERE question_id = ? ORDER BY id')
        .all(r.id)
        .map((o: any) => ({ id: o.id, text: o.text }));
      return { id: r.id, text: r.text, options: opts };
    });
  }

  getCorrectMap(): Record<number, number> {
    const rows = this.db.prepare('SELECT id, correct_option_id FROM questions').all();
    const map: Record<number, number> = {};
    rows.forEach((r: any) => { map[r.id] = r.correct_option_id; });
    return map;
  }

  // small initializer will be used by seed script
  static initSchemaAndSeed(dbPath = DB_PATH) {
    const db = new Database(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        correct_option_id INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      );
    `);
    db.close();
  }
}
