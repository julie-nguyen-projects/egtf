const EleveService = require("../services/eleveService");

const EleveController = {
    findAll: () => {
        return EleveService.findALl();
    },

    findById: (id) => {
        return EleveService.findById(id);
    },

    create: (eleve) => {
        return EleveService.create(eleve);
    },

    update: (eleve, id) => {
        return EleveService.update(eleve, id);
    },

    deleteEleve: (id) => {
        return EleveService.delete(id);
    },

    deleteAll: () => {
        return EleveService.deleteAll();
    },
}

module.exports = EleveController;
