const { MongoClient} = require("mongodb");
const cloudinary = require('cloudinary');
require("dotenv").config();
const { MONGO_URI, CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});

const destroyImage = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const { pathArray, publicId } = req.body;

    try {
        await client.connect();
        const db = client.db("directories");

        const result = await cloudinary.uploader.destroy(req.body.publicId);

        if (result.result !== 'ok') {
            return res.status(401).json({status: 401, message: "Could not delete image"})
        } 
        else {
            const filter = {"username": pathArray[0]};
            const keyToUpdate = `userObj.${pathArray.join(".")}.-${pathArray[pathArray.length -1]}`
            const update = {$pull: {[keyToUpdate]: { publicId: publicId}}}
            
            const updatedResult = await db.collection('directories').updateOne(filter, update);
            
            updatedResult.modifiedCount 
            ? res.status(200).json({status: 200, message: "deleted image!"})
            : res.status(400).json({status: 400, message: "Could not delete image"})
        }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = destroyImage;
