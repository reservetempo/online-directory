const express = require('express');
const app = express();
const morgan = require("morgan");
const createDirectory = require('./handlers/createDirectory');
const getDirectory = require('./handlers/getDirectory');
const addImage = require('./handlers/addImage');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 4000;

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
app.use(morgan("tiny"))
app.use(express.static("./server/assets"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", express.static(__dirname + "/"))

app.get('/directories/:id', getDirectory);
app.post('/directories', createDirectory);

app.post('/images', upload.single('image'), addImage)

app.get('/', (req, res) => {
  console.log("hello")
  res.status(200).json({status: 200, message: "heelo! "});
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));