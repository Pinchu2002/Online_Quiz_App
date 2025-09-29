"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizDB = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const DB_PATH = path_1.default.join(__dirname, '..', 'quiz.db');
class QuizDB {
    constructor(dbPath = DB_PATH) {
        this.db = new better_sqlite3_1.default(dbPath);
        // ensure foreign keys
        this.db.pragma('foreign_keys = ON');
    }
    close() {
        this.db.close();
    }
    getQuestionsForApi() {
        const qRows = this.db.prepare('SELECT id, text FROM questions ORDER BY id').all();
        return qRows.map((r) => {
            const opts = this.db
                .prepare('SELECT id, text FROM options WHERE question_id = ? ORDER BY id')
                .all(r.id)
                .map((o) => ({ id: o.id, text: o.text }));
            return { id: r.id, text: r.text, options: opts };
        });
    }
    getCorrectMap() {
        const rows = this.db.prepare('SELECT id, correct_option_id FROM questions').all();
        const map = {};
        rows.forEach((r) => { map[r.id] = r.correct_option_id; });
        return map;
    }
    // small initializer will be used by seed script
    static initSchemaAndSeed(dbPath = DB_PATH) {
        const db = new better_sqlite3_1.default(dbPath);
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
exports.QuizDB = QuizDB;
