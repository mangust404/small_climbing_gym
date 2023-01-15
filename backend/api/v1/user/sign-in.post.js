const { MongoClient, ObjectId } = require('mongodb');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

module.exports = async function signIn(req, res) {
  const query = req.body;

  const client = new MongoClient(req.headers.node_env == 'test'? process.env.MONGODB_URI_TEST: process.env.MONGODB_URI);
  try {

    const database = client.db(req.headers.node_env == 'test'? process.env.MONGODB_DB_TEST: process.env.MONGODB_DB);

    const users = database.collection('users')

    const user = await users.findOne({email: query.email});

    if (user && passwordHash.verify(query.password, user.password) && user.verified) {
      res.json({
        success: true,
        token: jwt.sign({name: user.name, id: user._id.toString()}, process.env.REACT_APP_SECRET_KEY, { expiresIn: '1m' }),
        name: user.name
      });

      return;
    }

  }
  catch(e) {
    res.json({
      success: false,
      error: e.toString()
    });
    return;
  }
  finally {
    client.close()
  }

  res.json({
    success: false
  });
}