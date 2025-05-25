var express = require('express');
var router = express.Router();
const db = require("../config/database");

router.get("/", function (req, res, next) {
  // Query categories
  db.query(`SELECT * FROM category`, (err, categories) => {
    if (err) return res.status(500).json({ error: err.message });

    // Query 5 random objects for "What's New"
    db.query(`SELECT * FROM object ORDER BY RAND() LIMIT 5`, (err, whatsNew) => {
      if (err) return res.status(500).json({ error: err.message });

      // Count total categories
      db.query(`SELECT COUNT(*) AS totalCategories FROM category`, (err, totalCategoriesResult) => {
        if (err) return res.status(500).json({ error: err.message });

        // Count total objects
        db.query(`SELECT COUNT(*) AS totalObjects FROM object`, (err, totalObjectsResult) => {
          if (err) return res.status(500).json({ error: err.message });

          // Object of the month 1 (first object)
          db.query(`SELECT * FROM object LIMIT 1`, (err, objectOfMonth1) => {
            if (err) return res.status(500).json({ error: err.message });

            // Object of the month 2 (second object)
            db.query(`SELECT * FROM object LIMIT 1 OFFSET 1`, (err, objectOfMonth2) => {
              if (err) return res.status(500).json({ error: err.message });

              // Render index with all data
              res.render('index', {
                title: 'home',
                category: categories,
                whatsNew: whatsNew,
                totalCategories: totalCategoriesResult[0].totalCategories,
                totalObjects: totalObjectsResult[0].totalObjects,
                objectOfMonth1: objectOfMonth1[0],
                objectOfMonth2: objectOfMonth2[0]
              });
            });
          });
        });
      });
    });
  });
});


router.get("/kategori/:kategori", function (req, res, next) {
  const idCat = req.params.kategori;

  // Ambil semua object dengan kategori tertentu
  db.query(
    `SELECT * FROM object WHERE id_cat = ${idCat}`,
    (err, objects) => {
      if (err) return res.status(500).json({ error: err.message });

      // Ambil data kategori yang dipilih
      db.query(
        `SELECT * FROM category WHERE id_cat = ${idCat}`,
        (err, catResult) => {
          if (err) return res.status(500).json({ error: err.message });

          // Ambil semua kategori untuk navigasi
          db.query(`SELECT * FROM category`, (err, allCategories) => {
            if (err) return res.status(500).json({ error: err.message });

            // Jika kategori tidak ditemukan
            if (!catResult.length)
              return res.status(404).send("Kategori tidak ditemukan");

            res.render("pages", {
              title: catResult[0].nama,
              data: objects,
              category: allCategories,
            });
          });
        }
      );
    }
  );
});


router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
