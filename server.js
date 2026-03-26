const express = require('express');
const dotenv = require('dotenv');
const { connectToMongo } = require('./src/database/connect');
const routes = require('./src/routes');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

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
