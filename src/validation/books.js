const { body, param, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    message: 'Validation failed',
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg
    }))
  });
};

const validateObjectId = [
  param('id').isMongoId().withMessage('Invalid MongoDB ObjectId'),
  handleValidation
];

const validateBook = [
  body('title').trim().notEmpty().withMessage('title is required'),
  body('author').trim().notEmpty().withMessage('author is required'),
  body('genre').trim().notEmpty().withMessage('genre is required'),
  body('publishedYear')
    .isInt({ min: 1000, max: 2100 })
    .withMessage('publishedYear must be a valid year'),
  body('pages').isInt({ min: 1 }).withMessage('pages must be a positive integer'),
  body('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('rating must be a number between 0 and 5'),
  body('inStock').isBoolean().withMessage('inStock must be boolean'),
  handleValidation
];

module.exports = {
  validateBook,
  validateObjectId
};
