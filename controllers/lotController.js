const LotService = require('../services/lotService');

exports.findAll = async (req, res) => {
    try {
        const lots = await LotService.findALl();
        res.render("lots", {model : lots})
    } catch (err) {
        console.error(err);
        res.status(500).json({message : err.message});
    }
}
