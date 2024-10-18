var express = require('express');
var router = express.Router();

/* GET data page. */
router.get('/', function(req, res, next) {
    const test = {
        titre: "Test",
        items: ["un", "deux", "trois"]
    };
    res.render("data", { model: test });
});

module.exports = router;
