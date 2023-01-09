// get code. Only for testing environment.

const { MongoClient } = require('mongodb');

module.exports = async function confirmation_code(req, res) {
  const query = req.body;

  if (req.headers.node_env != 'test') {
    throw new Exception('This method may be called only for test environment');
  }

  const mongoUrl = process.env.MONGODB_URI_TEST;
  
  const mongoClient = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const database = mongoClient.db();
  if (database) {
    const result = await database.collection('users').findOne({email: query.email});

    if (result && result.confirmation_code) {
      res.json({success: true, code: result.confirmation_code});
      return;
    }
  }
  res.status(404).send({success: false});
}