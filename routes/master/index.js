var express = require('express');
var router = express.Router();
const db = require('../../config/database');

const objectRouter = require('./object');
const categoryRouter = require('./category');
router.use('/object', objectRouter);
router.use('/category', categoryRouter);

router.get('/', function (req, res, next) {
  let limit = parseInt(req.query.limit) || 10;
  let page = parseInt(req.query.page) || 1;
  let offset = (page - 1) * limit;

  db.query('SELECT COUNT(*) AS count FROM object', function (err, countResult) {
    if (err) {
      req.flash('error', err);
      return res.render('master/index', { data: [], limit: limit, page: page, totalPages: 0 });
    }
    let totalCount = countResult[0].count;
    let totalPages = Math.ceil(totalCount / limit);

    db.query('SELECT * FROM object o JOIN category c ON o.id_cat = c.id_cat LIMIT ? OFFSET ?', [limit, offset], function (err, rows) {
      if (err) {
        req.flash('error', err);
        return res.render('master/index', { data: [], limit: limit, page: page, totalPages: totalPages });
      }
      res.render('master/index', {
        data: rows,
        limit: limit,
        page: page,
        totalPages: totalPages
      });
    });
  });
});

module.exports = router;
