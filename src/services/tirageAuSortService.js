const LotService = require('./lotService');
const EleveService = require('./eleveService');
const ConstantsHelper = require('../utils/constantsHelper');

const TirageAuSortService = {

    /**
     * Tirage au sort des lots physiques pour la France métropolitaine
     */
    async tirageLotsPhysiquesFrance() {
        const lotsPhysFc = await LotService.findByPhysiqueAndFrance();

        const elevesFc = await EleveService.findByFrance();

        try {
            // Tirages par maisons
            this.tirageLotsPhysFcParMaison(lotsPhysFc, elevesFc, ConstantsHelper.MAISONS.GRYFFONDOR);
            this.tirageLotsPhysFcParMaison(lotsPhysFc, elevesFc, ConstantsHelper.MAISONS.POUFSOUFFLE);
            this.tirageLotsPhysFcParMaison(lotsPhysFc, elevesFc, ConstantsHelper.MAISONS.SERDAIGLE);
            this.tirageLotsPhysFcParMaison(lotsPhysFc, elevesFc, ConstantsHelper.MAISONS.SERPENTARD);

            console.log("Lots mis à jour");
        } catch (e) {
            console.error("Erreur lors de la màj des logs")
        }
    },

    /**
     * Tirage Lots Physiques France quand le critère de maison est en jeu
     */
    tirageLotsPhysFcParMaison(lotsPhysFc, elevesFc, maisonCriteria) {
        const filteredLots = lotsPhysFc.filter(lot => lot.maison === maisonCriteria);
        const filteredEleves = elevesFc.filter(eleve => eleve.maison === maisonCriteria);


        filteredLots.map(async lot => {
            // Attribution d'un élève de la maison
            const randomEleve = filteredEleves[Math.floor(Math.random() * filteredEleves.length)];
            // màj du lot
            lot.gagnant_e = randomEleve.pseudoDiscord;
            await LotService.updateGagnant_e(lot, lot.id);

            // Retrait des tickets du gagnant de la liste des élèves
            await EleveService.deleteAllTickets(randomEleve.pseudoDiscord);

            return {
                lot,
                gagnant_e: randomEleve
            }
        });
    },


    /**
     * Répartition des lots physiques par maison et par zone de livraison
     */

    // Retourner les lots physiques
    getLotsPhysiques() {
        const lotsPhysiques = LotService.findByLotsPhysiques()
    },


    // Lots UE

    // Lots reste du monde


    // Eleves : regrouper aussi en zones de livraison

    // Tirage

}

module.exports = TirageAuSortService;
