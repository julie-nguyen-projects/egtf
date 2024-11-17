const {Op} = require("sequelize");
const Eleve = require('../models').Eleve;

const EleveService = {
    findALl: () => {
        return Eleve.findAll({
                order: [['pseudoDiscord','ASC']],
                raw: true
            },
        )
    },

    findById(id) {
        return  Eleve.findByPk(id);
    },

    create(eleve) {
        return Eleve.create(eleve);
    },

    update(eleve, id ) {
        Eleve.update({
                pseudoDiscord : eleve.pseudoDiscord ,
                maison: eleve.maison ,
                zoneLivraison: eleve.zoneLivraison,
                idDiscord: eleve.idDiscord ,
            }
            ,
            {
                where: {
                    id: id
                },
            });
    },

    delete(id) {
        return Eleve.destroy({
            where: {
                id: id
            },
        });
    },

    createEleveFromCsvFile(pseudoComplet, zoneLivraison, maison) {
        let [ idDiscord, pseudoDiscord ] = pseudoComplet.substring(1).split(')');
        let eleve = {
            pseudoDiscord: pseudoDiscord,
            idDiscord: idDiscord,
            maison: maison,
            zoneLivraison: zoneLivraison
        }
        return Eleve.create(eleve);
    },

    async deleteAllTickets(pseudoDiscord) {
        await Eleve.destroy({
                where: {
                    pseudoDiscord: pseudoDiscord
                },
            }
        )
    },

    findByFrance() {
        return Eleve.findAll({
            where: {
                zoneLivraison: 'France métropolitaine'
            },
            raw: true
        })
    },

    findByFranceOrUE() {
        return Eleve.findAll({
            where: {
                zoneLivraison: {
                    [Op.or] : ['France métropolitaine', "Pays au sein de l'Union Européenne (hors France métropolitaine)"]
                }
            },
            raw: true
        })
    },
}

module.exports = EleveService;
