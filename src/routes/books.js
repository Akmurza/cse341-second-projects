const express = require('express');
const booksController = require('../controllers/books');
const { isAuthenticated } = require('../middleware/auth');
const { validateBook, validateObjectId } = require('../validation/books');

const router = express.Router();

router.get('/', booksController.getAll);
router.get('/:id', validateObjectId, booksController.getById);
router.post('/', isAuthenticated, validateBook, booksController.create);
router.put('/:id', isAuthenticated, validateObjectId, validateBook, booksController.update);
router.delete('/:id', isAuthenticated, validateObjectId, booksController.remove);

module.exports = router;
