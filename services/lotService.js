const Lot = require('./../models/index').Lot;

const LotService = {
    findALl: () => {
        return Lot.findAll();
    },
    findById(id) {
         return  Lot.findByPk(id);
    }

}

module.exports = LotService;
