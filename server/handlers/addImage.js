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

  try {
    await client.connect();
    const db = client.db("wearables");

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result.url)
    
    result.url 
    ? res.status(200).json({status: 200, message: "added Product!"})
    : res.status(401).json({status: 401, message: "Could not add product"})
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "internal server error" });
  } finally {
    client.close();
  }
};

module.exports = addImage;
