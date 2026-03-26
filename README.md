# second-project

CSE 341 Week 03 Project 2 Part 1.

## Features
- Express REST API
- MongoDB connection
- CRUD routes (`GET`, `POST`, `PUT`, `DELETE`)
- Validation with `express-validator`
- Centralized error handling
- Swagger docs at `/api-docs`

## Project Structure
- `server.js`
- `src/database/connect.js`
- `src/controllers/books.js`
- `src/routes/books.js`
- `src/routes/index.js`
- `src/validation/books.js`
- `src/middleware/errorHandler.js`
- `swagger-output.json`
- `books.rest`

## Setup
1. Install dependencies:
   - `npm install`
2. Create `.env` from `.env.example` and fill MongoDB values.
3. Run server:
   - `npm run dev`

## Routes
- `GET /`
- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`

## Validation fields for books
- `title` (string, required)
- `author` (string, required)
- `genre` (string, required)
- `publishedYear` (int 1000-2100, required)
- `pages` (positive int, required)
- `rating` (float 0-5, required)
- `inStock` (boolean, required)

## Notes
- For Week 04 you can add OAuth/authentication without changing core CRUD structure.
