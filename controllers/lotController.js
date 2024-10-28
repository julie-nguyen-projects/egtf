const LotService = require('../services/lotService');
const {Lot} = require("../models");

const findAll = () => {
       return LotService.findALl();
}

const findById = (id) => {
    return LotService.findById(id);
};

const create = (nomBoutique, maison, description, livraison) => {
    return LotService.create(nomBoutique, maison, description, livraison);
}

const update = (lot, id) => {
    return LotService.update(lot, id);
}

module.exports = {
    findAll,
    findById,
    create,
    update
}
