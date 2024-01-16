const { MongoClient} = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getUsernames = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('directories');
    // const deletem = await db.collection('directories').deleteMany({})
    const result = await db.collection('directories').find({}, { projection: { _id: 0, username: 1 } }).toArray();
    const dirs = await db.collection('directories').find().toArray();

    result ? 
    res.status(200).json({status: 200, result}) :
    res.status(400).json({status: 400, message: "could not get users"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = getUsernames;