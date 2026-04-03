# second-project

CSE 341 Project 2 (Week 03-04): CRUD API with validation, error handling, and OAuth authentication.

## Features

- Express REST API
- MongoDB (at least two collections: `books`, `receipts`)
- Full CRUD (`GET`, `POST`, `PUT`, `DELETE`) for both collections
- Validation with `express-validator` on `POST` and `PUT`
- Centralized error handling middleware
- GitHub OAuth login/logout with `passport`
- Protected routes (authentication required)
- Swagger docs at `/api-docs`

## Tech Stack

- `express`
- `mongodb`
- `express-validator`
- `passport`
- `passport-github2`
- `express-session`
- `swagger-autogen`
- `swagger-ui-express`

## Environment Variables

Create a `.env` file using `.env.example`:

- `PORT`
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `SESSION_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GITHUB_CALLBACK_URL`

For local development:

- `GITHUB_CALLBACK_URL=http://localhost:3001/oauth/github/callback`

For Render deployment:

- `GITHUB_CALLBACK_URL=https://your-render-app.onrender.com/oauth/github/callback`

## Install and Run

```bash
npm install
npm run swagger
npm run dev
```

## API Routes

### Public routes

- `GET /`
- `GET /api-docs`
- `GET /login` (starts GitHub OAuth)
- `GET /oauth/github/callback`
- `GET /auth/status`
- `GET /logout`
- `GET /books`
- `GET /books/:id`
- `GET /receipts`
- `GET /receipts/:id`

### Protected routes (must be logged in)

- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`
- `POST /receipts`
- `PUT /receipts/:id`
- `DELETE /receipts/:id`

If unauthenticated, protected routes return `401`.

## Validation

### Books fields

- `title` (string, required)
- `author` (string, required)
- `genre` (string, required)
- `publishedYear` (int `1000-2100`, required)
- `pages` (positive int, required)
- `rating` (float `0-5`, required)
- `inStock` (boolean, required)

### Receipts fields

- `receiptNumber` (string, required, min length 3)
- `vendorName` (string, required, min length 2)
- `receiptDate` (ISO date, required)
- `totalAmount` (positive number, required)
- `itemCount` (positive integer, required)
- `paymentMethod` (`cash|credit_card|debit_card|check|digital_wallet`, required)
- `category` (`groceries|electronics|clothing|utilities|other`, required)

Invalid payloads return `400` with validation details.

## Error Handling

- `404` for unknown routes
- `404` when item by ID does not exist
- `400` for validation failures
- `500` for unexpected server errors

## Deployment Checklist (Week 04)

- Push source code to GitHub (without secrets)
- Deploy API to Render
- Configure Render environment variables
- Verify Swagger at `https://your-app.onrender.com/api-docs`
- Record demo video (5-8 minutes): CRUD, OAuth login/logout, protected routes, MongoDB updates

