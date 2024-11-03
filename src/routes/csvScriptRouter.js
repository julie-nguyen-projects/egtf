const express = require('express');
const router = express.Router();
const csvScriptController = require('../controllers/csvScriptController');
const LotController = require('../controllers/lotController');
const EleveController = require('../controllers/eleveController');
const multer = require("multer");

/**
 * Multer configuration
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

/**
 * GET csv scripts page
 * Affichage des boutons d'ajout uniquement s'il n'y a pas de lots ou d'élèves en BDD
 */
router.get('/', async (req, res) => {

    try {
        // Vérification des lots
        const lots = await LotController.findAll();
        const areThereLots = lots.length > 0;

        // Vérification des élèves
        const eleves = await EleveController.findAll();
        const areThereEleves = eleves.length > 0;


        // Affichage de la page
        res.render('csvScripts', {
            areThereLots,
            areThereEleves
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

/**
 * POST ajout de lots
 */
router.post("/addLots", upload.single('file'), function (req, res) {
    try {
        csvScriptController.addLotsFromCsvFile(req.file);

        res.redirect("/lots")
    } catch (error) {
        // handle error
        return res.status(400).json({ message: error.message });
    }
});

/**
 * POST ajout d'élèves
 */
router.post("/addEleves", upload.single('file'), function (req, res) {
    try {
        csvScriptController.addElevesFromCsvFile(req.file);

        res.redirect("/eleves")
    } catch (error) {
        // handle error
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
