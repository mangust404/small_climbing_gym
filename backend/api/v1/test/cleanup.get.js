// Cleanup entier database. Only for testing environment.
const { MongoClient } = require('mongodb');

module.exports = async function cleanup(req, res) {
  if (req.headers.node_env != 'test') {
    throw new Exception('Cleanup may be called only for test environment');
  }

  const mongoUrl = process.env.MONGODB_URI_TEST;
  
  const mongoClient = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const database = mongoClient.db();
  if (database) {
    const collections = await database.listCollections();
    await collections.forEach(async collection => {
      console.log(`Dropping ${collection.name}`);
      await database.collection(collection.name).drop();
    });
  }

  res.json({success: true});
}