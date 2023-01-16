const { MongoClient, ObjectId } = require('mongodb');
const passwordHash = require('password-hash');

module.exports = async function passwordSet(req, res) {
  const request = req.body;

  const client = new MongoClient(req.headers.node_env == 'test'? process.env.MONGODB_URI_TEST: process.env.MONGODB_URI);
  try {

    const database = client.db(req.headers.node_env == 'test'? process.env.MONGODB_DB_TEST: process.env.MONGODB_DB);

    const users = database.collection('users')

    const user = await users.findOne({email: request.email});

    if (user 
        && user.email == request.email
        && user.verified
        && user.confirmation_code == request.code
        && request.password == request.password2) {

      const filter = {_id: ObjectId(user._id)};
      const updateDoc = {
        $set: {
          password: passwordHash.generate(request.password)
        },
        $unset: { confirmation_code: '' }
      }

      const update_result = await users.updateOne(filter, updateDoc);
      
      if (update_result && update_result.modifiedCount > 0) {
        res.json({
          success: true
        });
        return;
      }
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
    success: false,
    error: 'Unknown error'
  });
}