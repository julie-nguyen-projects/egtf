const LotService = require('./lotService');
const EleveService = require('./eleveService');
const ConstantsHelper = require('../utils/constantsHelper');

const TirageAuSortService = {

    /**
     * ÉTAPE 1
     * Tirage au sort des lots physiques pour la France métropolitaine
     */
    async tirageLotsPhysiquesFrance() {
        const lotsPhysFc = await LotService.findByPhysiqueAndFrance();
        const elevesFc = await EleveService.findByFrance();

        // Lots Physiques Fc métropolitaine avec critères de maison
        await this.tirageLotsByMaison(lotsPhysFc, elevesFc);

        // Vérifier les lots physiques France métropolitaine restants après tirage par maison
        const lotsPhysFcRestants = await LotService.findByPhysiqueAndFrance();

        // Lots Physiques France métropolitaine restants
        await this.tirageLotsRestants(lotsPhysFcRestants, elevesFc);
    },

    /**
     * Tirage des lots par maison
     * @param {Array} lotsPhysFc - Lots physiques pour la France
     * @param {Array} elevesFc - Élèves vivant en France
     */
    async tirageLotsByMaison(lotsPhysFc, elevesFc) {
        const maisons = [
            ConstantsHelper.MAISONS.GRYFFONDOR,
            ConstantsHelper.MAISONS.POUFSOUFFLE,
            ConstantsHelper.MAISONS.SERDAIGLE,
            ConstantsHelper.MAISONS.SERPENTARD
        ];

        for (const maison of maisons) {
            const filteredLots = lotsPhysFc.filter(lot => lot.maison === maison);
            const filteredEleves = elevesFc.filter(eleve => eleve.maison === maison);

            await this.attribuerLotsAuxEleves(filteredLots, filteredEleves);
        }
    },
    /**
     * Tirage des lots restants pour la France métropolitaine
     * @param {Array} lotsRestants - Lots physiques restants (déjà filtrés)
     * @param {Array} elevesFc - Élèves vivant en France
     */
    async tirageLotsRestants(lotsRestants, elevesFc) {
        await this.attribuerLotsAuxEleves(lotsRestants, elevesFc);
    },

    /**
     * Attribuer les lots aux élèves
     * @param {Array} lots - Lots à attribuer
     * @param {Array} eleves - Élèves à qui attribuer les lots
     */
    async attribuerLotsAuxEleves(lots, eleves) {
        for (const lot of lots) {
            if (eleves.length > 0) { // Vérifier s'il reste des élèves à qui attribuer des lots, tirage terminé si plus aucun
                const randomIndex = Math.floor(Math.random() * eleves.length);
                const randomEleve = eleves[randomIndex];

                lot.gagnant_e = randomEleve.pseudoDiscord;
                await LotService.updateGagnant_e(lot, lot.id);
                // Suppression des tickets du gagnant
                await EleveService.deleteAllTickets(randomEleve.pseudoDiscord);
            }
        }
    },

    /**
     * ÉTAPE 2
     * TODO appeler cette fonction
     * Tirage au sort des lots physiques pour l'UE
     */
    async tirageLotsPhysiquesUE() {
        const lotsPhysFcAndUE = await LotService.findByPhysiqueAndUE();

        const elevesFcOrUE = await EleveService.findByFranceOrUE();

        try {
            lotsPhysFcAndUE.map(async lot => {
                // Attribution d'un élève de la maison
                const randomEleve = elevesFcOrUE[Math.floor(Math.random() * elevesFcOrUE.length)];

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

            console.log("Lots mis à jour");
        } catch (e) {
            console.error("Erreur lors de la màj des lots")
        }
    },

    /**
     * ÉTAPE 3
     * Tirage au sort des lots pour le reste du monde
     */

    // Lots non physiques


}

module.exports = TirageAuSortService;
