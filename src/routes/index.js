const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger-output.json');
const booksRoutes = require('./books');
const receiptsRoutes = require('./receipts');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Second Project API is running',
    docs: '/api-docs'
  });
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/books', booksRoutes);
router.use('/receipts', receiptsRoutes);

module.exports = router;
