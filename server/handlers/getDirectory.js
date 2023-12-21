const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getDirectory = async (req, res) => {
  let routes = "";
  const {_id} = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('directories');
    const result = await db.collection('directories').findOne(_id);
    
    for (let i = 0; i < findDepth(result.userObj); i++) {
      routes += `/:sub${i}?`
    }

    result && res.status(200).json({status: 200, data: result, routes})
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

function findDepth(obj) {
  if (typeof obj !== 'object' || obj === null) {
      return 0;
  }

  let maxDepth = 0;
  for (let key in obj) {
      if (typeof obj[key] === 'object') {
          maxDepth = Math.max(maxDepth, findDepth(obj[key]));
      }
  }

  return maxDepth + 1;
}

module.exports = getDirectory;