const { ObjectId } = require('mongodb');
const { getDatabase } = require('../database/connect');

const COLLECTION = 'books';

const getCollection = () => getDatabase().collection(COLLECTION);

const getAll = async (req, res, next) => {
  /* #swagger.tags = ['Books'] */
  try {
    const books = await getCollection().find().toArray();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  /* #swagger.tags = ['Books'] */
  try {
    const { id } = req.params;
    const book = await getCollection().findOne({ _id: new ObjectId(id) });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  /* #swagger.tags = ['Books'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          title: 'The Pragmatic Programmer',
          author: 'Andrew Hunt',
          genre: 'Software Development',
          publishedYear: 1999,
          pages: 352,
          rating: 4.8,
          inStock: true
        }
  } */
  try {
    const result = await getCollection().insertOne(req.body);
    res.status(201).json({ message: 'Book created', id: result.insertedId });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  /* #swagger.tags = ['Books'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Fiction',
          publishedYear: 1925,
          pages: 180,
          rating: 4.5,
          inStock: true
        }
  } */
  try {
    const { id } = req.params;
    const result = await getCollection().replaceOne(
      { _id: new ObjectId(id) },
      req.body
    );

    if (!result.matchedCount) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  /* #swagger.tags = ['Books'] */
  try {
    const { id } = req.params;
    const result = await getCollection().deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
