const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', function(req, res, next){
    db.query(`select * from object`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log(rows)
        res.render('buah/index', { data: rows});
    })
})

// router.post("/", function (req, res, next) {
//   const newbuah = req.body;

//   const query =
//     `INSERT INTO object (id_cat, object, img, audio) VALUES (${newbuah.id_cat}, '${newbuah.object}', '${newbuah.img}', '${newbuah.audio}')`;
//   db.query(query, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//         const selectQuery = `select * from object where id = ${result.insertId}`;
//         db.query(selectQuery, (err, rows) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({
//               data: rows[0],
//               message: "Data buah berhasil ditambahkan",
//               id: result.insertId,
//             });
//         })
//   });
// });

// router.delete('/:id', function (req, res, next) {
//     const buahId = req.params.id;
//     parseInt(buahId);
//     const query = `delete from object where id = '${buahId}'`;

//     db.query(query, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });

//         res.json({
//             message: "Data berhasil dihapus",
//         })
//     })
// })

// router.put('/:id', function (req, res, next) {
//     const buahId = req.params.id;
//     const buahs = req.body;
//     const query = `update object set id_cat = '${buahs.id_cat}', object = '${buahs.object}', img = '${buahs.img}', audio = '${buahs.audio}' where id = '${buahId}'`;

//     if (!(buahs.id_cat && buahs.object && buahs.img && buahs.audio)){
//         return res.status(400).send("some field are missing")
//     }
//       db.query(query, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({
//           message: "berhasil update",
//         });
//       });
// })

// router.patch('/:id', function (req, res, next) {
//         const buahId = req.params.id;
//         const buahs = req.body;
//         const query = `update object set object = '${buahs.object}' where id = '${buahId}'`;

//         db.query(query, (err, result) => {
//           if (err) return res.status(500).json({ error: err.message });
//           res.json({
//             message: "berhasil update"
//           });
//         });
// })
module.exports = router;