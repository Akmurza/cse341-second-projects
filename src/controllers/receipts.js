const { ObjectId } = require('mongodb');
const { getDatabase } = require('../database/connect');

const COLLECTION = 'receipts';

const getCollection = () => getDatabase().collection(COLLECTION);

const getAll = async (req, res, next) => {
  /* #swagger.tags = ['Receipts'] */
  try {
    const receipts = await getCollection().find().toArray();
    res.status(200).json(receipts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  /* #swagger.tags = ['Receipts'] */
  /* #swagger.parameters['id'] = { description: 'Receipt ID' } */
  try {
    const { id } = req.params;
    const receipt = await getCollection().findOne({ _id: new ObjectId(id) });

    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }

    res.status(200).json(receipt);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  /* #swagger.tags = ['Receipts'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          receiptNumber: 'REC-2026-001',
          vendorName: 'The Book Haven',
          receiptDate: '2026-03-28',
          totalAmount: 125.50,
          itemCount: 5,
          paymentMethod: 'credit_card',
          category: 'groceries'
        }
  } */
  try {
    const result = await getCollection().insertOne(req.body);
    res.status(201).json({ message: 'Receipt created', id: result.insertedId });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  /* #swagger.tags = ['Receipts'] */
  /* #swagger.parameters['id'] = { description: 'Receipt ID' } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          receiptNumber: 'REC-2026-002',
          vendorName: 'Ancient Pages',
          receiptDate: '2026-03-28',
          totalAmount: 125.50,
          itemCount: 5,
          paymentMethod: 'credit_card',
          category: 'groceries'
        }
  } */
  try {
    const { id } = req.params;
    const result = await getCollection().replaceOne(
      { _id: new ObjectId(id) },
      req.body
    );

    if (!result.matchedCount) {
      return res.status(404).json({ message: 'Receipt not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  /* #swagger.tags = ['Receipts'] */
  /* #swagger.parameters['id'] = { description: 'Receipt ID' } */
  try {
    const { id } = req.params;
    const result = await getCollection().deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return res.status(404).json({ message: 'Receipt not found' });
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
