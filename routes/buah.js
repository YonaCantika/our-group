var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("buah/index", {title: "buah"});
});

// router.put(/)
module.exports = router;