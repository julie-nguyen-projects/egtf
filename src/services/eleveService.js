const Eleve = require('../models').Eleve;

const EleveService = {
    findALl: () => {
        return Eleve.findAll({order:
                [['pseudoDiscord','ASC']]
        });
    },

    findById(id) {
        return  Eleve.findByPk(id);
    },

    create(eleve) {
        console.log(eleve)
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

}

module.exports = EleveService;
