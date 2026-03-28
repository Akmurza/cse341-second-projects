const express = require('express');
const dotenv = require('dotenv');
const { connectToMongo } = require('./src/database/connect');
const routes = require('./src/routes');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to remove trailing slashes (but not for root path)
app.use((req, res, next) => {
  if (req.path !== '/' && req.path.length > 1 && req.path.endsWith('/')) {
    res.redirect(301, req.path.slice(0, -1));
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
