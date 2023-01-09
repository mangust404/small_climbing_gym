const { MongoClient } = require('mongodb');

module.exports = async function code(req, res) {
  const query = req.body;

  const mongoUrl = req.headers.node_env == 'test'? process.env.MONGODB_URI_TEST: process.env.MONGODB_URI;
  
  const mongoClient = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const database = mongoClient.db();
  if (database) {
  	const result = await database.collection('users').findOne({email: query.email});

    if (result) {
	    res.json({success: result.confirmation_code == query.code});
      return;
    }
  }
  res.json({success: false});
}