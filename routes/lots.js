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

/* Update Lot post /edit/:id */
router.post('/edit/:id',(req, res) => {
    const id = req.params.id;
    const lot = [req.body.NomBoutique, req.body.Maison, req.body.Description, req.body.Livraison, id];
    const sql = "UPDATE Lots SET NomBoutique = ?, Maison = ?, Description = ?, Livraison = ? WHERE (Lot_ID = ?)";
    db.run(sql, lot, err => {
        if (err) {
            console.error('Problème lors de la mise à jour du lot' + id);
        }
        res.redirect("/lots");
    });
});

module.exports = router;
