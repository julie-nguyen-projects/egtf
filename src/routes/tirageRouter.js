const express = require('express');
const TirageController = require("../controllers/tirageController");
const router = express.Router();

/* GET page "Tirage au sort" */
router.get('/', ( (req, res) => {

        try {
            res.render("tirage")
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }
    })
);

/* POST Tirage Lots Physique France /tirage/physFrance */
router.post('/physFrance',  async (req, res) => {

    try {
        await TirageController.tirageLotsPhysiquesFrance();
        res.redirect("/lots");
        // TODO affichage ?

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
