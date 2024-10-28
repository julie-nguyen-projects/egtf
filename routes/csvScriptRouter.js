const express = require('express');
const router = express.Router();

/* GET csv scripts page */
router.get('/', function(req, res, next) {
    res.render('csvScripts');
});

/* POST ajout de lots */
router.post("/addLots", (req, res) => {
    console.log('ajout de lots')
    res.redirect("/lots")
});

module.exports = router;
