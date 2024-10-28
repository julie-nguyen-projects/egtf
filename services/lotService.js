const Lot = require('./../models/index').Lot;

const LotService = {
    findALl: () => {
        return Lot.findAll();
    }
}

module.exports = LotService;
