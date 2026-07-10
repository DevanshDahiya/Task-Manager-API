# Task Manager API

A production-style RESTful API for managing tasks, built with Node.js, Express, and MongoDB. Includes JWT authentication, ownership-based authorization, input validation, rate limiting, and automated testing.

**Live API:** https://task-manager-api-vfj8.onrender.com

> Note: hosted on Render's free tier — the first request after inactivity may take 30-60 seconds to respond while the service spins up.

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Full CRUD for tasks (create, read, update, delete)
- Ownership-based authorization — users can only access their own tasks
- Input validation with express-validator
- Centralized error handling
- Pagination, filtering, and sorting on task listing
- Security middleware: helmet, rate limiting, NoSQL injection sanitization
- Automated integration tests with Jest and Supertest
- Request logging with morgan

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens (JWT), bcrypt
- **Validation:** express-validator
- **Testing:** Jest, Supertest, mongodb-memory-server
- **Security:** helmet, express-rate-limit, express-mongo-sanitize

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/DevanshDahiya/Task-Manager-API.git
cd task-manager-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development

### Running the app

```bash
# development (auto-restarts on changes)
npm run dev

# production
npm start
```

### Running tests

```bash
npm test
```

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a JWT |

### Tasks (all require `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks for the logged-in user (supports `?status`, `?priority`, `?sortBy`, `?order`, `?page`, `?limit`) |
| GET | `/api/tasks/:id` | Get a single task by ID |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Example Request

**Register**
```json
POST /api/auth/register
{
  "username": "user",
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Create a task**
```json
POST /api/tasks
Authorization: Bearer <your_token>
{
  "title": "Finish project README",
  "priority": "high",
  "dueDate": "2026-07-20"
}
```

## Project Structure
├── controller/
├── database/
├── middleware/
├── models/
├── routes/
├── tests/
├── utils/
├── app.js
└── server.js

## What I Learned

Building this project involved debugging real issues beyond tutorial-level problems — environment variable mismatches, bcrypt hook errors, Mongoose middleware pitfalls, Express version incompatibilities with third-party middleware, and structuring an app to be testable independently of its running server.