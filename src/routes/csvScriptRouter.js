const express = require('express');
const router = express.Router();
const csvScriptController = require('../controllers/csvScriptController');
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
 */
router.get('/', (req, res) => {
    res.render('csvScripts');
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

module.exports = router;
