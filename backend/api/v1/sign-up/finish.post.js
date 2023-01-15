const { MongoClient, ObjectId } = require('mongodb');
const passwordHash = require('password-hash');

module.exports = async function finish(req, res) {
  const result = req.body;

  const client = new MongoClient(req.headers.node_env == 'test'? process.env.MONGODB_URI_TEST: process.env.MONGODB_URI);
  try {

    const database = client.db(req.headers.node_env == 'test'? process.env.MONGODB_DB_TEST: process.env.MONGODB_DB);

    const users = database.collection('users')

    const user = await users.findOne(ObjectId(result.id));

    if (user && user.email == result.email && user.confirmation_code == result.code) {

      const filter = {_id: ObjectId(result.id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          password: passwordHash.generate(result.password),
          lang: result.lang,
          name: result.name,
          phone: result.phone,
          grade: result.grade,
          verified: true,
          createdAt: new Date()
        },
        $unset: { confirmation_code: '' }
      }

      const update_result = await users.updateOne(filter, updateDoc, options);
      
      const updated_user = await users.findOne(ObjectId(result.id));

      if (updated_user) {
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
      error: e.toString(),
      data: result
    });
    return;
  }
  finally {
    client.close()
  }

  res.json({
    success: true
  });
}