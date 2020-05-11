const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, callback) {
    console.log(file)
    callback(null, file.originalname);
  }
});

module.exports = storage;
