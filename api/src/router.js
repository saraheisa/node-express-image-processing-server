const { Router } = require('express');
const multer = require('multer');

const router = Router();

const storage = multer.diskStorage({
  destination: 'api/uploads/',
  filename: filename,
});

function filename(request, file, callback) {
  callback(null, file.originalname);
}

module.exports = router;
