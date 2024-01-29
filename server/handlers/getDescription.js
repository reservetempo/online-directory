const { MongoClient, ObjectId} = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getDescription = async (req, res) => {
  const {id} = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('directories');
    
    const result = await db.collection('texts').findOne({_id: new ObjectId(id)});

    result ? 
    res.status(200).json({status: 200, text: result.text}) :
    res.status(400).json({status: 400, message: "could not get text"})

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = getDescription;