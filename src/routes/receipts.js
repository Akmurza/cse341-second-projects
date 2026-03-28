const express = require('express');
const receiptsController = require('../controllers/receipts');
const { validateReceipt, validateObjectId } = require('../validation/receipts');

const router = express.Router();

router.get('/', receiptsController.getAll);
router.get('/:id', validateObjectId, receiptsController.getById);
router.post('/', validateReceipt, receiptsController.create);
router.put('/:id', validateObjectId, validateReceipt, receiptsController.update);
router.delete('/:id', validateObjectId, receiptsController.remove);

module.exports = router;
