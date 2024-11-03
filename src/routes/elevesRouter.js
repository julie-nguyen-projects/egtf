const express = require('express');
const router = express.Router();
const EleveController = require('../controllers/eleveController');

/**
 * Get page Eleves
 */
router.get('/', (async (req, res) => {
        try {
            const eleves = await EleveController.findAll();
            res.render("eleves", {eleves: eleves})
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }
    })
);

/**
 * GET /edit/:id
 */
router.get('/edit/:id',(req, res) => {
        try {
            const id = req.params.id;
            EleveController.findById(id).then(row =>
                res.render("editEleve", { eleve: row })
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }
    }
);

/**
 *  POST Eleve update /edit/:id
 */
router.post('/edit/:id',async (req, res) => {
    const id = req.params.id;
    const eleve = {
        'pseudoDiscord': req.body.pseudoDiscord,
        'maison': req.body.maison,
        'zoneLivraison': req.body.zoneLivraison,
        'idDiscord': req.body.idDiscord
    };
    console.log(eleve)
    try {
        await EleveController.update(eleve, id);
        res.redirect("/eleves")

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});


/**
 * GET create page Eleve /create
 */
router.get('/create', (req, res) => {
    res.render("createEleve", { eleve: {} });
});


/**
 * POST create Eleve /create
 */
router.post("/create", async (req, res) => {
    const eleve = {
        'pseudoDiscord': req.body.pseudoDiscord,
        'maison': req.body.maison,
        'zoneLivraison': req.body.zoneLivraison,
        'idDiscord': req.body.idDiscord
    };
    try {
        console.log(req)
        await EleveController.create(eleve);
        res.redirect("/eleves");
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

/**
 * Get delete page Eleve /delete/:id
 */
router.get("/delete/:id", (req, res) => {
        try {
            const id = req.params.id;
            EleveController.findById(id).then(row =>
                res.render("deleteEleve", { eleve: row })
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }
    }
);

/**
 * POST delete Eleve /delete/:id
 */
router.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await EleveController.deleteEleve(id);
        res.redirect("/eleves");
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});


module.exports = router;
