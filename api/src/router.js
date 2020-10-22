const { Router } = require('express');

const router = Router();

function filename(request, file, callback) {
  callback(null, file.originalname);
}

module.exports = router;
