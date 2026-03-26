# second-project

CSE 341 Week 03 Project 2 Part 1.

## Features

- Express REST API
- MongoDB 
- CRUD routes (`GET`, `POST`, `PUT`, `DELETE`)
- Validation with `express-validator`
- Error handling
- Swagger docs at `/api-docs`

## Structure

- `server.js`
- `src/database/connect.js`
- `src/controllers/books.js`
- `src/routes/books.js`
- `src/routes/index.js`
- `src/validation/books.js`
- `src/middleware/errorHandler.js`
- `swagger-output.json`
- `books.rest`



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

