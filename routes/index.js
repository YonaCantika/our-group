var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});

// router.put('/buah/:id', function (req, res, next) {
//   const id = req.params.id;
//   const 
// });
module.exports = router;
