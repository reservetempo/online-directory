const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const updateSubdirectory = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const {id}  = req.params;
  const {path, newSubdir, subdir} = req.body;

  try {
    await client.connect();
    const db = client.db('directories');

    const filter = {"username": id};
    const keyToUpdate = newSubdir ? `userObj.${path.join(".")}.${newSubdir}` : `userObj.${path.join(".")}.${subdir}`;
    const update = newSubdir ? {$set: {[keyToUpdate]: {}}} : {$unset: {[keyToUpdate] : ""}};

    const updatedResult = await db.collection('directories').updateOne(filter, update);

    if (!updatedResult.matchedCount) {
      return res.status(400).json({ status: 400, path, newSubdir, message: "could not find path"});
    }

    updatedResult.modifiedCount ? 
    res.status(200).json({ status: 200, path, newSubdir, message: "updated subdirectory!"}) :
    res.status(400).json({ status: 400, path, newSubdir, message: "could not update subdirectory"})
    // if (subdir) {
    //   const keyToUpdate = `userObj.${path.join(".")}.${subdir}`;
    //   const update = {$unset: {[keyToUpdate] : ""}}

    //   const deletedResult = await db.collection('directories').updateOne(filter, update);
    //   console.log(deletedResult)
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = updateSubdirectory;