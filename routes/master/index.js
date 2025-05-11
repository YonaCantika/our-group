var express = require('express');
var router = express.Router();
const db = require('../../config/database');

const objectRouter = require('./object');
const categoryRouter = require('./category');

router.use('/object', objectRouter);
router.use('/category', categoryRouter);

router.get('/', function (req, res, next) {
  db.query('select * from object', function (err, rows) {
      if (err) {
          req.flash('error', err);
      } else {
          res.render('master/index', {
              data: rows
          });
      }
  });
});

module.exports = router;
