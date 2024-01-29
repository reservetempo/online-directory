const express = require('express');
const app = express();
const morgan = require("morgan");
const createDirectory = require('./handlers/createDirectory');
const getDirectory = require('./handlers/getDirectory');
const addImage = require('./handlers/addImage');
const getUsernames = require('./handlers/getDirectories');
const { auth } = require('express-oauth2-jwt-bearer');
const updateSubdirectory = require('./handlers/updateSubdirectory');
const destroyImage = require('./handlers/destroyImage');
const PORT = process.env.PORT || 4000;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const addDescription = require('./handlers/addDescription');
const getDescription = require('./handlers/getDescription');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'online-d',
    public_id: (req, file) => file.filename,
  }
})
const upload = multer({ storage: storage });

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
const jwtCheck = auth({
  audience: 'http://localhost:4000',
  issuerBaseURL: 'https://dev-3gejjr50zgiyixl3.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

app.use(morgan("tiny"))
app.use(express.static("./server/assets"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", express.static(__dirname + "/"))

app.get('/directories/:id', getDirectory);
app.get('/directories', getUsernames);
app.get('/images/:id', getDescription);

app.use(jwtCheck)
app.post('/directories', createDirectory);
app.patch('/directories/:id', updateSubdirectory);

app.post('/images/:branch', upload.single('image'), addImage);
app.patch('/images/:branch', addDescription)
app.delete('/images', destroyImage)

app.get('/', (req, res) => {
  console.log("hello")
  res.status(200).json({status: 200, message: "heelo! "});
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));