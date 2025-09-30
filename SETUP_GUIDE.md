# 🚀 Quiz Application - Setup Guide

This guide will help you set up and run the Quiz Application on your local machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **Git** (for version control)

Check your versions:
```bash
node --version
npm --version
```

---

## 🛠️ Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Online_Quiz_App
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Install ESLint (if not already installed)
```bash
npm install --save-dev eslint
```

#### Configure Environment Variables
The `.env` file should already be created. If not, copy from example:
```bash
cp .env.example .env
```

Verify the `.env` file contains:
```
PORT=5000
NODE_ENV=development
DB_PATH=src/database/quiz.db
CORS_ORIGIN=http://localhost:3000
MAX_QUIZ_TIME=3600
ENABLE_TIMER=true
```

#### Initialize Database
```bash
# Run migrations to create tables
npm run db:migrate

# Seed the database with sample quiz data
npm run db:seed
```

#### Verify Backend Setup
```bash
# Start the development server
npm run dev
```

The backend should now be running on `http://localhost:5000`

Test the health check endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Quiz Application API is running",
  "timestamp": "2025-09-30T16:31:44.000Z",
  "environment": "development"
}
```

### 3. Frontend Setup

Open a new terminal window:

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Configure Environment Variables
The `.env` file should already be created. If not, create it:
```bash
# Create .env file
touch .env
```

Add the following content:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENABLE_TIMER=true
REACT_APP_ENABLE_REVIEW=true
```

#### Start Frontend
```bash
npm start
```

The frontend should now be running on `http://localhost:3000`

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend

# Run all tests
npm test
```

---

## 🔍 Code Quality

### Run ESLint (Backend)
```bash
cd backend

# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

---

## 📂 Project Structure

```
Online_Quiz_App/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── database/        # Database connection and migrations
│   │   ├── middlewares/     # Express middlewares
│   │   ├── models/          # Data models
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── tests/               # Test files
│   ├── .env                 # Environment variables
│   ├── .eslintrc.json       # ESLint configuration
│   ├── package.json         # Dependencies and scripts
│   └── server.js            # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   ├── public/              # Static files
│   ├── .env                 # Environment variables
│   └── package.json         # Dependencies and scripts
│
└── README.md                # Project documentation
```

---

## 🎯 Quick Start Commands

### Development Mode (Run both servers)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Terminal 3 - Tests (Optional):**
```bash
cd backend
npm run test:watch
```

---

## 🌐 API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Quiz Endpoints
- **GET** `/api/quiz/:quizId` - Get quiz with questions
- **POST** `/api/quiz/:quizId/submit` - Submit quiz answers

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:

**Backend:**
```bash
# Change PORT in backend/.env
PORT=5001
```

**Frontend:**
```bash
# Change port in frontend/.env
PORT=3001
```

### Database Issues
If you encounter database errors:
```bash
cd backend
# Delete the database
rm src/database/quiz.db
# Recreate it
npm run db:migrate
npm run db:seed
```

### Module Not Found
If you see "Module not found" errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
Ensure the backend `.env` has:
```
CORS_ORIGIN=http://localhost:3000
```

---

## ✅ Verification Checklist

- [ ] Node.js and npm are installed
- [ ] Backend dependencies installed (`backend/node_modules` exists)
- [ ] Frontend dependencies installed (`frontend/node_modules` exists)
- [ ] Backend `.env` file created and configured
- [ ] Frontend `.env` file created and configured
- [ ] Database migrated and seeded (`backend/src/database/quiz.db` exists)
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Health check endpoint returns "OK"
- [ ] Can access frontend at `http://localhost:3000`

---

## 📚 Next Steps

Once setup is complete:

1. **Explore the Application**: Navigate to `http://localhost:3000`
2. **Take a Quiz**: Click on a quiz to start
3. **Review Code**: Explore the codebase structure
4. **Run Tests**: Ensure all tests pass
5. **Make Changes**: Start implementing new features!

---

## 🆘 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the [Quiz Application Design Document.pdf](./Quiz%20Application%20Design%20Document.pdf)
- Check existing tests for usage examples

---

**Happy Coding! 🎉**
