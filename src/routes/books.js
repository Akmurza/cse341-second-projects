const express = require('express');
const booksController = require('../controllers/books');
const { validateBook, validateObjectId } = require('../validation/books');

const router = express.Router();

router.get('/', booksController.getAll);
router.get('/:id', validateObjectId, booksController.getById);
router.post('/', validateBook, booksController.create);
router.put('/:id', validateObjectId, validateBook, booksController.update);
router.delete('/:id', validateObjectId, booksController.remove);

module.exports = router;
