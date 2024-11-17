const {Op} = require("sequelize");
const Lot = require('../models').Lot;

const LotService = {
    findALl: () => {
        return Lot.findAll({order:
                [['nomBoutique','ASC']]
        });
    },

    findById(id) {
        return  Lot.findByPk(id);
    },

    create(nomBoutique, maison, description, livraison) {
        let newLot = {nomBoutique: nomBoutique, maison: maison, description: description, livraison: livraison};
        return Lot.create(newLot);
    },

    createWithCompleteFields(nomBoutique, maison, description, livraison, physique) {
        let newLot = {
            nomBoutique: nomBoutique,
            maison: maison,
            description: description,
            livraison: livraison,
            physique: physique
        };
        return Lot.create(newLot);
    },

    update(lot, id) {
        Lot.update({
                nomBoutique : lot.nomBoutique ,
                description: lot.description ,
                maison: lot.maison ,
                livraison: lot.livraison,
                gagnant_e: lot.gagnant_e
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
    },

    deleteAll() {
        return Lot.truncate();
    },

    findByLotsPhysiques() {
        return Lot.findAll({
            where: {
                physique: {
                    [Op.eq]: 'Oui',
                }
            }
        })
    },

    findByPhysiqueAndFrance() {
        return Lot.findAll({
            where: {
                physique: 'Oui',
                livraison: 'France',
                gagnant_e: {
                    [Op.or] : [null, '']
                }
            },
            raw: true
        },)
    },

    async updateGagnant_e(lot, id) {
        await Lot.update({
                gagnant_e: lot.gagnant_e
            }
            ,
            {
                where: {
                    id: id
                },
            });
    },

    findByPhysiqueAndUE() {
        return Lot.findAll({
            where: {
                physique: 'Oui',
                livraison: 'France et UE',
                gagnant_e: {
                    [Op.or] : [null, '']
                }
            },
            raw: true
        },)
    },
}

module.exports = LotService;
