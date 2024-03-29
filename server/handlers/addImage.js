const { MongoClient} = require("mongodb");
const cloudinary = require('cloudinary');
require("dotenv").config();
const { MONGO_URI, CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});

const addImage = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const pathArray = req.params.branch.split("-");
  
  try {
    await client.connect();
    const db = client.db("directories");

    const imageUrl = req.file.path;
    const publicId = req.file.filename;

    if (!imageUrl) {
      return res.status(401).json({status: 401, message: "Could not add image"})
    } 
    else {
      const title = req.body.title;

      const filter = {"username": pathArray[0]};
      const keyToUpdate = `userObj.${pathArray.join(".")}.-${pathArray[pathArray.length -1]}`
      const update = {
        $push: {
          [keyToUpdate]: { 
            title: title,
            imgSrc: imageUrl, 
            publicId: publicId
          }
        }
      }
      const updatedResult = await db.collection('directories').updateOne(filter, update);

      updatedResult.modifiedCount 
      ? res.status(200).json({status: 200, message: "added image!"})
      : res.status(401).json({status: 401, message: "Could not add image"})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = addImage;
