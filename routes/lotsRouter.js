const express = require('express');
const router = express.Router();
const LotController = require('./../controllers/lotController');
const LotService = require("../services/lotService");

/* GET page "Lots" */
router.get('/', (async (req, res) => {
        try {
            const lots = await LotController.findAll();
            res.render("lots", {model: lots})
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }
    })
);


/* GET /edit/:id */
router.get('/edit/:id',(req, res) => {
        try {
            const id = req.params.id;
            LotController.findById(id).then(row =>
                res.render("editLot", { model: row })
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }

    }
);

/* POST Lot update /edit/:id */
router.post('/edit/:id',(req, res) => {
    const id = req.params.id;
    const lot = [req.body.nomBoutique, req.body.maison, req.body.description, req.body.livraison, id];
    LotController.update(lot);
    const sql = "UPDATE Lots SET NomBoutique = ?, Maison = ?, Description = ?, Livraison = ? WHERE (Lot_ID = ?)";
    db.run(sql, lot, err => {
        if (err) {
            console.error('Problème lors de la mise à jour du lot' + id);
        }
        res.redirect("/lots");
    });
});

/* GET create page Lot /create */
router.get('/create', (req, res) => {
    res.render("createLot", { model: {} });
});

/* POST create Lot /create */
router.post("/create", (req, res) => {
    const sql = "INSERT INTO Lots (NomBoutique, Maison, Description, Livraison) VALUES (?, ?, ?, ?)";
    const lot = [req.body.NomBoutique, req.body.Maison, req.body.Description, req.body.Livraison];
    db.run(sql, lot, err => {
        // if (err) ...
        res.redirect("/lots");
    });
});

/* Get delete page Lot /delete/:id */
router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Lots WHERE Lot_ID = ?";
    db.get(sql, id, (err, row) => {
        // if (err) ...
        res.render("deleteLot", { model: row });
    });
});

/* POST delete lot /delete/:id */
router.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM Lots WHERE Lot_ID = ?";
    db.run(sql, id, err => {
        // if (err) ...
        res.redirect("/lots");
    });
});

module.exports = router;
