const LotService = require('../services/lotService');

const LotController = {
    findAll: () => {
        return LotService.findALl();
    },

    findById: (id) => {
        return LotService.findById(id);
    },

    create: (nomBoutique, maison, description, livraison) => {
        return LotService.create(nomBoutique, maison, description, livraison);
    },

    update: (lot, id) => {
        return LotService.update(lot, id);
    },

    deleteLot: (id) => {
        return LotService.delete(id);
    },
}

module.exports = LotController;
