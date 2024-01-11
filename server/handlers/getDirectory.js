const { MongoClient} = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const validator = require('validator');

const getDirectory = async (req, res) => {
  const {id} = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('directories');
    
    if (validator.isEmail(id)) {
        const result = await db.collection('directories').findOne({_id: id});

        result ?
        res.status(200).json({status: 200, result: true}) :
        res.status(400).json({status: 400, result: false})
    }
    else {
        const result = await db.collection('directories').findOne({username: id});

        result ? 
        res.status(200).json({status: 200, data: result}) :
        res.status(400).json({status: 400, message: "could not get directory"})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = getDirectory;