var express = require("express");
var router = express.Router();
const db = require("../config/database");
const argon2 = require("argon2");
const flash = require("express-flash");

router.get("/", function (req, res, next) {
  res.render("login", { title: "Login" });
});

// router.post("/register", async function (req, res, next) {
//     const { username, pass } = req.body;
  
//     // Validasi
//     if (!username || !pass) {
//       return res.status(400).json({ error: "Username dan password wajib diisi" });
//     }
  
//     try {
//       const hash = await argon2.hash(pass);
//       db.query(
//         "INSERT INTO users (username, pass) VALUES (?, ?)",
//         [username, hash],
//         function (err, result) {
//           if (err) return next(err);
//           res.send("Registrasi berhasil!");
//         }
//       );
//     } catch (err) {
//       next(err);
//     }
//   });
  
router.post("/", async function (req, res, next) {
  const { username, password } = req.body;
  db.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    async (err, results) => {
      if (err) flash("error", err.message);
      if (results.length != 1) {
        return res.render("login", {
          title: "Login",
          error: "Username atau password salah, silahkan coba lagi",
        });
      }
      const user = results[0];
      // Verifikasi password dengan hash di database
      const valid = await argon2.verify(user.pass, password);
      if (valid) {
        req.session.user = user;
        res.redirect("/master");
      } else {
        res.render("login", {
          title: "Login",
          error: "Username atau password salah",
        });
      }
    }
  );
});
module.exports = router;
