const { MongoClient, ObjectId, Binary } = require("mongodb");
const cloudinary = require('cloudinary');
require("dotenv").config();
const { MONGO_URI } = process.env;

cloudinary.config({ 
  cloud_name: 'dfycy5fbx', 
  api_key: '896929384252848', 
  api_secret: 'qk_8dH0k-GuPpohlVWkM5LQ7-44' 
});

const addImage = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db("wearables");

    // cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    // { public_id: "olympic_flag" }, 
    // function(error, result) {console.log(result); });
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
