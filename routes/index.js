let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.end('Social Network API');
});

module.exports = router;
