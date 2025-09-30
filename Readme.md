# 🎯 Quiz Application

A full-stack quiz application built with Node.js and React, following MVC architecture and SOLID principles. Users can take interactive quizzes, navigate between questions, and receive instant scores with detailed feedback.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-%5E18.0.0-blue.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features
- 📝 **Interactive Quiz Taking**: Navigate through questions with intuitive UI
- ⏭️ **Question Navigation**: Move forward and backward between questions
- 💾 **Answer Persistence**: Answers saved as you navigate
- 🎯 **Instant Scoring**: Submit and receive your score immediately
- 📊 **Clean Architecture**: MVC pattern with SOLID principles

### Bonus Features
- ⏱️ **Quiz Timer**: Countdown timer with auto-submit
- ✅ **Answer Review**: See which questions you got right/wrong
- 📈 **Detailed Results**: View correct answers for missed questions
- 🎨 **Responsive Design**: Works seamlessly on all devices

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: SQLite3
- **Validation**: Joi
- **Testing**: Jest, Supertest
- **Architecture**: MVC + Repository Pattern

### Frontend
- **Library**: React 18
- **HTTP Client**: Axios
- **State Management**: Context API + Custom Hooks
- **Styling**: CSS Modules / Tailwind CSS
- **Routing**: React Router DOM

### Development Tools
- **Package Manager**: npm / yarn
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

---

## 🏗️ Architecture

This application follows **MVC (Model-View-Controller)** architecture with additional layers:

```
┌─────────────────────────────────────────┐
│           Controllers                    │  ← Handle HTTP requests
├─────────────────────────────────────────┤
│            Services                      │  ← Business logic
├─────────────────────────────────────────┤
│          Repositories                    │  ← Data access
├─────────────────────────────────────────┤
│            Models                        │  ← Data entities
├─────────────────────────────────────────┤
│           Database                       │  ← SQLite
└─────────────────────────────────────────┘
```

### SOLID Principles Applied
- ✅ **Single Responsibility**: Each class has one reason to change
- ✅ **Open/Closed**: Open for extension, closed for modification
- ✅ **Liskov Substitution**: Interfaces are substitutable
- ✅ **Interface Segregation**: Small, focused interfaces
- ✅ **Dependency Inversion**: Depend on abstractions, not concretions

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (comes with Node.js)
- **Git**: For version control

Check your versions:
```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/quiz-application.git
cd quiz-application
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Setup Database
```bash
cd ../backend
npm run db:migrate
npm run db:seed
```

---

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_PATH=./database/quiz.db

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Application Settings
MAX_QUIZ_TIME=3600
ENABLE_TIMER=true
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Feature Flags
REACT_APP_ENABLE_TIMER=true
REACT_APP_ENABLE_REVIEW=true
```

---

## 🏃 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

### Production Mode

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Backend in Production
```bash
cd backend
npm start
```

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm test -- ScoringService.test.js

# Run in watch mode
npm run test:watch
```

### Run Frontend Tests
```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

### Test Coverage Goals
- **Unit Tests**: >80% coverage
- **Integration Tests**: All API endpoints
- **E2E Tests**: Complete user flows

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get Quiz
```http
GET /quiz/:quizId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "JavaScript Basics",
    "description": "Test your JavaScript knowledge",
    "timeLimit": 600,
    "questions": [
      {
        "id": 1,
        "text": "What is a closure?",
        "options": [
          { "id": 1, "text": "A function with access to parent scope" },
          { "id": 2, "text": "A type of loop" },
          { "id": 3, "text": "A data structure" }
        ]
      }
    ]
  }
}
```

#### Submit Quiz
```http
POST /quiz/:quizId/submit
```

**Request Body:**
```json
{
  "answers": [
    { "questionId": 1, "selectedOptionId": 1 },
    { "questionId": 2, "selectedOptionId": 3 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "attemptId": 123,
    "score": 8,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "percentage": 80,
    "grade": "B"
  }
}
```

#### Get Results (Bonus)
```http
GET /quiz/:quizId/results/:attemptId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 8,
    "totalQuestions": 10,
    "answers": [
      {
        "questionId": 1,
        "questionText": "What is a closure?",
        "selectedOption": "A function with access to parent scope",
        "correctOption": "A function with access to parent scope",
        "isCorrect": true
      }
    ]
  }
}
```

---

## 📁 Project Structure

```
quiz-application/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── models/           # Data models
│   │   ├── repositories/     # Data access layer
│   │   ├── services/         # Business logic
│   │   ├── controllers/      # Request handlers
│   │   ├── middlewares/      # Express middlewares
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   └── database/         # Database files
│   ├── tests/                # Test files
│   ├── .env.example          # Environment variables template
│   ├── package.json
│   └── server.js             # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── hooks/            # Custom hooks
│   │   ├── context/          # Context providers
│   │   ├── pages/            # Page components
│   │   ├── utils/            # Utility functions
│   │   └── App.jsx           # Root component
│   ├── public/               # Static assets
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── docs/                     # Additional documentation
│   ├── DESIGN.md            # Design document
│   └── API.md               # Detailed API docs
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🎨 Design Patterns

### Repository Pattern
Abstracts data access logic from business logic:
```javascript
// Interface
class IQuizRepository {
  async findById(quizId) {}
  async getQuestionsForQuiz(quizId) {}
}

// Implementation
class QuizRepository extends IQuizRepository {
  // Concrete implementation with SQLite
}
```

### Service Layer Pattern
Encapsulates business logic:
```javascript
class QuizService {
  constructor(quizRepository, scoringService) {
    this.quizRepository = quizRepository;
    this.scoringService = scoringService;
  }
  
  async getQuizForUser(quizId) {
    // Business logic here
  }
}
```

### Dependency Injection
Controllers receive dependencies:
```javascript
const quizRepository = new QuizRepository(db);
const scoringService = new ScoringService(quizRepository);
const quizService = new QuizService(quizRepository, scoringService);
const quizController = new QuizController(quizService);
```

---

## 🎯 Usage Examples

### Taking a Quiz

1. **Start the Application**
   - Navigate to `http://localhost:3000`
   - Click "Start Quiz"

2. **Answer Questions**
   - Read the question
   - Select an option
   - Click "Next" to proceed

3. **Navigate Between Questions**
   - Use "Previous" to review answers
   - Use "Next" to move forward

4. **Submit Quiz**
   - Review all answers
   - Click "Submit" on the last question
   - View your score and results

### With Timer (Bonus)
- Timer starts automatically
- Warning at 25% remaining time
- Auto-submits when time expires

### Review Answers (Bonus)
- After submission, view detailed results
- Green checkmarks for correct answers
- Red X for incorrect answers
- See the correct answer for missed questions

---

## 🔧 Development

### Adding a New Question Type

1. **Extend the Question Model**
```javascript
// models/MultiSelectQuestion.model.js
class MultiSelectQuestion extends Question {
  isCorrectAnswer(optionIds) {
    return _.isEqual(optionIds.sort(), this.correctOptionIds.sort());
  }
}
```

2. **Update the Scoring Service**
```javascript
// services/ScoringService.js
calculateScore(answers, questions) {
  // Handle different question types
}
```

### Adding a New API Endpoint

1. **Create Route**
```javascript
// routes/quiz.routes.js
router.get('/quiz/:quizId/stats', quizController.getStats);
```

2. **Add Controller Method**
```javascript
// controllers/QuizController.js
async getStats(req, res, next) {
  // Implementation
}
```

3. **Write Tests**
```javascript
// tests/integration/quiz.api.test.js
describe('GET /api/quiz/:quizId/stats', () => {
  // Test cases
});
```

---

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: SQLITE_CANTOPEN: unable to open database file
```
**Solution**: Run `npm run db:migrate` to create the database.

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change the PORT in `.env` or kill the process using the port.

#### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**: Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Use ESLint configuration provided
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Priyanshu Chhabda** - *Initial work* - [Pinchu2002](https://github.com/Pinchu2002)

---

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern quiz applications
- Built with best practices in mind

---

## 🗺️ Roadmap

- [ ] User authentication system
- [ ] Multiple quiz categories
- [ ] Leaderboards
- [ ] Quiz creation interface
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Social sharing features
- [ ] Multi-language support

---

## 📊 Project Status

**Current Version**: 1.0.0  
**Status**: Active Development  
**Last Updated**: September 2025

---
