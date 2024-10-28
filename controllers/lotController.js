const LotService = require('../services/lotService');

const findAll = () => {
       return LotService.findALl();
}

const findById = (id) => {
    return LotService.findById(id);
};

const update = async (lot) => {

}

module.exports = {
    findAll,
    findById
}
