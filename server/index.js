const express = require('express');
const app = express();
const morgan = require("morgan");
const createDirectory = require('./handlers/createDirectory');
const getDirectory = require('./handlers/getDirectory');
const addImage = require('./handlers/addImage');
const multer = require('multer');
const getUsernames = require('./handlers/getDirectories');
const { auth } = require('express-oauth2-jwt-bearer');
const updateSubdirectory = require('./handlers/updateSubdirectory');
const destroyImage = require('./handlers/destroyImage');
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 4000;

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, HEAD, GET, PUT, POST, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })
app.use(morgan("tiny"))
app.use(express.static("./server/assets"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", express.static(__dirname + "/"))

app.get('/directories/:id', getDirectory);
app.get('/directories', getUsernames);
app.post('/directories', createDirectory);

const jwtCheck = auth({
  audience: 'http://localhost:4000',
  issuerBaseURL: 'https://dev-3gejjr50zgiyixl3.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});
app.patch('/directories/:id',jwtCheck, updateSubdirectory);

app.post('/images/:branch', upload.single('image'), addImage);
app.delete('/images', destroyImage)

app.get('/', (req, res) => {
  console.log(req.auth);
  console.log("hello")
  res.status(200).json({status: 200, message: "heelo! "});
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));