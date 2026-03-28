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

const validateReceipt = [
  body('receiptNumber')
    .trim()
    .notEmpty()
    .withMessage('receiptNumber is required')
    .isLength({ min: 3 })
    .withMessage('receiptNumber must be at least 3 characters'),
  body('vendorName')
    .trim()
    .notEmpty()
    .withMessage('vendorName is required')
    .isLength({ min: 2 })
    .withMessage('vendorName must be at least 2 characters'),
  body('receiptDate')
    .notEmpty()
    .withMessage('receiptDate is required')
    .isISO8601()
    .withMessage('receiptDate must be a valid date (YYYY-MM-DD format)'),
  body('totalAmount')
    .isFloat({ min: 0.01 })
    .withMessage('totalAmount must be a positive number'),
  body('itemCount')
    .isInt({ min: 1 })
    .withMessage('itemCount must be a positive integer'),
  body('paymentMethod')
    .trim()
    .notEmpty()
    .withMessage('paymentMethod is required')
    .isIn(['cash', 'credit_card', 'debit_card', 'check', 'digital_wallet'])
    .withMessage('paymentMethod must be one of: cash, credit_card, debit_card, check, digital_wallet'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('category is required')
    .isIn(['groceries', 'electronics', 'clothing', 'utilities', 'other'])
    .withMessage('category must be one of: groceries, electronics, clothing, utilities, other'),
  handleValidation
];

module.exports = {
  validateReceipt,
  validateObjectId
};
