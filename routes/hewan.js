var express = require("express");
var router = express.Router();
const db = require("../config/database");

router.get("/", function (req, res, next) {
  db.query(`select * from object where id_cat = 1`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log(rows);
    res.render("hewan/index", { data: rows });
  });
});

module.exports = router;
