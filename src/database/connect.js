const { MongoClient } = require('mongodb');

let dbInstance;

const connectToMongo = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  const connectionString = process.env.MONGODB_URI || process.env.URI;
  const dbName = process.env.MONGODB_DB_NAME;

  if (!connectionString || !dbName) {
    throw new Error('MONGODB_URI and MONGODB_DB_NAME must be set in environment variables.');
  }

  const client = new MongoClient(connectionString);
  await client.connect();
  dbInstance = client.db(dbName);

  console.log(`Connected to MongoDB database: ${dbName}`);
  return dbInstance;
};

const getDatabase = () => {
  if (!dbInstance) {
    throw new Error('Database is not initialized. Call connectToMongo() first.');
  }

  return dbInstance;
};

module.exports = {
  connectToMongo,
  getDatabase
};
