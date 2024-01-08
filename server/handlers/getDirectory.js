const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getDirectory = async (req, res) => {
  const {username} = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('directories');
    const result = await db.collection('directories').findOne(username);
    
    result && res.status(200).json({status: 200, data: result})
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = getDirectory;