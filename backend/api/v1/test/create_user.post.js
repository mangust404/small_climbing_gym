const { MongoClient } = require('mongodb');
const passwordHash = require('password-hash');

module.exports = async function create_user(req, res) {
  const request = req.body;
  let result = {};

  const mongoUrl = process.env.MONGODB_URI_TEST;
  
  const mongoClient = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const database = mongoClient.db(process.env.MONGODB_DB_TEST);
  const users = database.collection('users')

  const email = 'test@test.com';
  const exists = await users.findOne({ email: request.email || email });
  
  if (exists) {
    result = exists;
  }
  else {
    result = {
      email: request.email || email,
      name: request.name || 'Test user',
      password: passwordHash.generate(request.password || 'testtest'),
      lang: request.lang || 'en',
      grade: request.grade || [1, 4],
      verified: true,
      createdAt: new Date()
    }
    const insertResult = await users.insertOne(result);

    result.id = insertResult.insertedId;
  }

  res.json({success: true, user: result});
}