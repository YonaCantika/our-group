var express = require('express');
var router = express.Router();
const db = require('../../config/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
    db.query('select * from object', function (err, rows) {
        if (err) {
            req.flash('error', err);
        } else {
            res.render('master/object/index', {
                data: rows
            });
        }
    });
});

router.get('/create', function (req, res, next) {
    res.render('master/object/create');
});


module.exports = router;