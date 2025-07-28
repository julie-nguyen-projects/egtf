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
router.post('/',  async (req, res) => {

    try {
        const resultatTirage = await TirageController.tirageLotsPhysiquesFrance();
        res.redirect("/lots");
       // res.redirect("/tirage/resultat", { resultatTirage });

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
