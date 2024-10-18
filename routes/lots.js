var express = require('express');
var router = express.Router();
var db = require('./../database')

/* GET page "Lots" */
router.get('/', function(req, res, next) {
    const sql = "SELECT * FROM Lots ORDER BY NomBoutique";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render("lots", { model: rows });
    });
});

/* Get /edit/:id */
router.get('/edit/:id',(req, res) => {
        const id = req.params.id;
        const sql = "SELECT * FROM Lots WHERE Lot_ID = ?";
        db.get(sql, id, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            res.render("editLot", { model: row });
        });
    }
);

module.exports = router;
