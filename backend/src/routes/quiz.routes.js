const express = require('express');
const QuizController = require('../controllers/QuizController');
const ResultController = require('../controllers/ResultController');
const QuizService = require('../services/QuizService');
const ScoringService = require('../services/ScoringService');
const ValidationService = require('../services/ValidationService');
const QuizRepository = require('../repositories/QuizRepository');
const QuestionRepository = require('../repositories/QuestionRepository');
const db = require('../database/db');
const { validateSubmission } = require('../middlewares/validator');

const router = express.Router();

// Dependencies
const questionRepository = new QuestionRepository(db);
const quizRepository = new QuizRepository(db);
const validationService = new ValidationService();
const scoringService = new ScoringService(questionRepository);
const quizService = new QuizService(quizRepository, scoringService, validationService);
const quizController = new QuizController(quizService);
const resultController = new ResultController(quizService);

// Routes
router.get('/:quizId', (req, res, next) => quizController.getQuiz(req, res, next));
router.post('/:quizId/submit', validateSubmission, (req, res, next) => quizController.submitQuiz(req, res, next));
router.get('/:quizId/results/:attemptId', (req, res, next) => resultController.getResults(req, res, next));

module.exports = router;
