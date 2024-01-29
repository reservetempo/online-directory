const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const addDescription = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const pathArray = req.params.branch.split("-");
    const keyToUpdate = `userObj.${pathArray.slice(0, pathArray.length -1).join(".")}.-${pathArray.slice(-2, -1)}.$[elem].descriptionId`

    try {
        await client.connect();
        const db = client.db('directories');

        const result = await db.collection('texts').insertOne(req.body);
        if (!result.insertedId) {
            return res.status(401).json({ status: 401, data: req.body, message: "could not add description"})
        } else {

            const filter = {"username": pathArray[0]};
            const update = {
                $set: {
                    [keyToUpdate]: result.insertedId
                }
            }
            const options = {
                arrayFilters: [{ "elem.title": pathArray.pop() }]
            };

            const updatedResult = await db.collection('directories').updateOne(filter, update, options);

            updatedResult.modifiedCount ? 
            res.status(201).json({ status: 201, insertedId: result.insertedId, message: "added description!"}) :
            res.status(401).json({ status: 401, data: req.body, message: "could not add description key"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "internal server error" });
    } finally {
        client.close();
    }
};

module.exports = addDescription;