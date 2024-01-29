const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const createDirectory = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const username  = req.body.username;
  // const filesName = `-${username}`;

  const userDocument = {
    _id: req.body.email,
    username: username,
    userObj: {
      [username]: {
        [`-${username}`]: []
      }
    }
  }

  try {
    await client.connect();
    const db = client.db('directories');

    const result = await db.collection('directories').insertOne(userDocument);

    result.insertedId ? 
    res.status(201).json({ status: 201, insertedId: result.insertedId, message: "created directory!"}) :
    res.status(401).json({ status: 401, data: req.body, message: "could not create directory"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = createDirectory;