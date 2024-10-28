const {where} = require("sequelize");
const Lot = require('./../models/index').Lot;

const LotService = {
    findALl: () => {
        return Lot.findAll();
    },
    findById(id) {
        return  Lot.findByPk(id);
    },

    create(nomBoutique, maison, description, livraison) {
        let newLot = {nomBoutique: nomBoutique, maison: maison, description: description, livraison: livraison};
        return Lot.create(newLot);
    },

    update(lot, id ) {
        Lot.update({
                nomBoutique : lot.nomBoutique ,
                description: lot.description ,
                maison: lot.maison ,
                livraison: lot.livraison
            }
            ,
            {
                where: {
                    id: id
                },
            });
    },

    delete(id) {
        return Lot.destroy({
            where: {
                id: id
            },
        });
    }
}

module.exports = LotService;
