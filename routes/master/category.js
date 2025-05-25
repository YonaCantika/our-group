var express = require('express');
var router = express.Router();
const db = require('../../config/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let offset = (page - 1) * limit;

    db.query('SELECT COUNT(*) AS count FROM category', function (err, countResult) {
        if (err) {
            req.flash('error', err);
            return res.render('master/category/index', { data: [], limit: limit, page: page, totalPages: 0 });
        }
        let totalCount = countResult[0].count;
        let totalPages = Math.ceil(totalCount / limit);

        db.query('select * from category LIMIT ? OFFSET ?', [limit, offset], function (err, rows) {
            if (err) {
                req.flash('error', err);
                return res.render('master/category/index', { data: [], limit: limit, page: page, totalPages: totalPages });
            }
            res.render('master/category/index', {
                data: rows,
                limit: limit,
                page: page,
                totalPages: totalPages
            });
        });
    });
});

router.get('/create', function (req, res, next) {
    res.render('master/category/create');
});

router.post('/store', function (req, res, next) {
    try {
        let { nama } = req.body;
        let Data = { nama }
        db.query('insert into category set ?', Data, function (err, result) {
            if (err) {
                req.flash('error', 'gagal menyimpan data' + err.message);
            } else {
                req.flash('success', 'berhasil menyimpan data');
            }
            res.redirect('/master/category');
        })
    } catch (error) {
        req.flash('error', 'Terjadi Kesalahan pada fungsi');
        res.redirect('/master/category');
    }
});

router.get('/edit/(:id)', function (req, res, next) {
    let id = req.params.id;
    db.query('select * from category where id_cat = ' + id, function (err, rows) {
        if (err) {
            req.flash('eror', 'query gagal');
        }
        else {
            res.render('master/category/edit', {
                id: rows[0].id_cat,
                nama: rows[0].nama
            })
        }
    })
});

router.post('/update/(:id)', function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama } = req.body;
        let Data = {
            nama: nama
        }
        db.query('update category set ? where id_cat = ' + id, Data, function (err) {
            if (err) {
                console.error('Query Error:', err);
                req.flash('eror', 'gagal query' + err.message);
            } else {
                req.flash('success', 'Berhasil memperbaharui data');
            }
            res.redirect('/master/category');
        })
    } catch {
        req.flash('eror', 'Terjadi kesalahan pada router');
        res.redirect('/master/category');
    }
});

router.get('/delete/(:id)', function (req, res, next) {
    let id = req.params.id;
    db.query('delete from category where id_cat = ' + id, function (err) {
        if (err) {
            req.flash('eror', 'gagal query');
        } else {
            req.flash('success', 'Data deleted successfully');
        }
        res.redirect('/master/category');
    })
});

module.exports = router;
