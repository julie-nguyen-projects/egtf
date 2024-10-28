const express = require('express');
const router = express.Router();
const LotController = require('./../controllers/lotController');

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
router.post('/edit/:id',async (req, res) => {
    const id = req.params.id;
    const lot = {
        'nomBoutique': req.body.nomBoutique,
        'maison': req.body.maison,
        'description': req.body.description,
        'livraison': req.body.livraison
    };
    try {
        await LotController.update(lot, id);
        res.redirect("/lots")

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

/* GET create page Lot /create */
router.get('/create', (req, res) => {
    res.render("createLot", { model: {} });
});

/* POST create Lot /create */
router.post("/create", async (req, res) => {
    try {
        await LotController.create(req.body.nomBoutique, req.body.maison, req.body.description, req.body.livraison);
        res.redirect("/lots");
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

/* Get delete page Lot /delete/:id */
router.get("/delete/:id", (req, res) => {
        try {
            const id = req.params.id;
            LotController.findById(id).then(row =>
                res.render("deleteLot", { model: row })
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }
    }
);

/* POST delete lot /delete/:id */
router.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await LotController.deleteLot(id);
        res.redirect("/lots");
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
