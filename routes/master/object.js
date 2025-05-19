var express = require('express');
var router = express.Router();
const db = require('../../config/database');

//konfigurasi photos and audio
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'img') {
      cb(null, 'public/images/');
    } else if (file.fieldname === 'audio') {
      cb(null, 'public/audio/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});

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
  db.query('select * from category', function (err, rows) {
    if (err) {
      req.flash('error', err);
    } else {
      res.render('master/object/create', {
        data: rows
      });
    }
  });
});


router.post('/store', upload.fields([{
  name: 'img'
}, {
  name: 'audio'
}]), function (req, res, next) {
  const {
    object,
    id_cat
  } = req.body;
  const gambar = req.files['img'] ? req.files['img'][0].filename : '';
  const audio = req.files['audio'] ? req.files['audio'][0].filename : '';

  db.query(
    'insert into object (object, id_cat, img, audio) values (?, ?, ?, ?)',
    [object, id_cat, gambar, audio],
    function (err, result) {
      if (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/master/object/create');
      } else {
        req.flash('success', 'Data berhasil ditambahkan!');
        res.redirect('/master/object');
      }
    }
  );
});

router.get('/edit/:id', function (req, res, next) {
  const id = req.params.id;

  db.query('select * from object where id = ?', [id], function (err, objectRows) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/master/object');
    }

    if (objectRows.length === 0) {
      req.flash('error', 'Data tidak ditemukan!');
      return res.redirect('/master/object');
    }

    db.query('select * from category', function (err, catRows) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/master/object');
      }

      res.render('master/object/edit', {
        object: objectRows[0],
        categories: catRows
      });
    });
  });
});


router.post('/update/:id', upload.fields([{
  name: 'img'
}, {
  name: 'audio'
}]), function (req, res, next) {
  const id = req.params.id;
  const {
    object,
    id_cat
  } = req.body;

  const gambarBaru = req.files['img'] ? req.files['img'][0].filename : null;
  const audioBaru = req.files['audio'] ? req.files['audio'][0].filename : null;

  // Ambil data lama dulu dari DB
  db.query('select * from object where id = ?', [id], function (err, rows) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/master/object');
    }

    if (rows.length === 0) {
      req.flash('error', 'Data tidak ditemukan!');
      return res.redirect('/master/object');
    }

    const objectLama = rows[0];

    // Hapus file lama jika ada file baru yang diupload
    if (gambarBaru && objectLama.img) {
      const pathGambarLama = path.join(__dirname, '../../public/images/', objectLama.img);
      if (fs.existsSync(pathGambarLama)) fs.unlinkSync(pathGambarLama);
    }

    if (audioBaru && objectLama.audio) {
      const pathAudioLama = path.join(__dirname, '../../public/audio/', objectLama.audio);
      if (fs.existsSync(pathAudioLama)) fs.unlinkSync(pathAudioLama);
    }

    // Buat query update
    let query = 'update object set object = ?, id_cat = ?';
    let params = [object, id_cat];

    if (gambarBaru) {
      query += ', img = ?';
      params.push(gambarBaru);
    }

    if (audioBaru) {
      query += ', audio = ?';
      params.push(audioBaru);
    }

    query += ' where id = ?';
    params.push(id);

    db.query(query, params, function (err) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/master/object/edit/' + id);
      }

      req.flash('success', 'Data berhasil diperbarui!');
      res.redirect('/master/object');
    });
  });
});

router.get('/delete/(:id)', function (req, res, next) {
  let id = req.params.id;
  db.query('delete from object where id = ' + [id], function (err) {
    if (err) {
      req.flash('eror', 'gagal query');
    } else {
      req.flash('success', 'Data deleted successfully');
    }
    res.redirect('/master/object');
  })
});


module.exports = router;