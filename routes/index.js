var express = require('express');
var router = express.Router();
const db = require("../config/database");

router.get("/", function (req, res, next) {
  db.query(`select * from category`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render('index', { title: 'home', category: rows });
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


module.exports = router;
