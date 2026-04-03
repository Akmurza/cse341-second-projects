const express = require('express');
const receiptsController = require('../controllers/receipts');
const { isAuthenticated } = require('../middleware/auth');
const { validateReceipt, validateObjectId } = require('../validation/receipts');

const router = express.Router();

router.get('/', receiptsController.getAll);
router.get('/:id', validateObjectId, receiptsController.getById);
router.post('/', isAuthenticated, validateReceipt, receiptsController.create);
router.put('/:id', isAuthenticated, validateObjectId, validateReceipt, receiptsController.update);
router.delete('/:id', isAuthenticated, validateObjectId, receiptsController.remove);

module.exports = router;
