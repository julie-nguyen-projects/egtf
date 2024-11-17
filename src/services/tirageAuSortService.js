/*
 *******************************************************************************
 *                                                                             *
 *                          Tirage Service                                     *
 *                                                                             *
 *******************************************************************************
 *
 * Description: Ce service gère le tirage au sort des lots.
 *
 * Remarques:
 * Le tirage se fait en plusieurs étapes :
 * - Répartition des lots physiques, des moins restrictifs aux + restrictifs géographiquement.
 * Ça permet de retirer déjà des participants et ainsi laisser un peu + de chance à ceux qui n'habitent pas
 * en France métropolitaine
 * - Puis on fait un tirage des lots dématérialisés
 * - À chaque étape s'il y a des critères de maisons, ils sont appliqués au tirage
 *
 *******************************************************************************
 */



const LotService = require('./lotService');
const EleveService = require('./eleveService');
const ConstantsHelper = require('../utils/constantsHelper');

const TirageAuSortService = {

    /*
    *******************************************************************************
    *                                                                             *
    *                          Fonctions utilitaires                              *
    *                                                                             *
    *******************************************************************************
    */


    /**
     * Tirage des lots par maison
     * @param {Array} lots - Lots à tirer
     * @param {Array} eleves - Élèves
     */
    async tirageLotsByMaison(lots, eleves) {
        const maisons = [
            ConstantsHelper.MAISONS.GRYFFONDOR,
            ConstantsHelper.MAISONS.POUFSOUFFLE,
            ConstantsHelper.MAISONS.SERDAIGLE,
            ConstantsHelper.MAISONS.SERPENTARD
        ];

        for (const maison of maisons) {
            const filteredLots = lots.filter(lot => lot.maison === maison);
            const filteredEleves = eleves.filter(eleve => eleve.maison === maison);

            await this.attribuerLotsAuxEleves(filteredLots, filteredEleves);
        }
    },

    /**
     * Tirage des lots restants
     * @param {Array} lotsRestants - Lots restants (déjà filtrés)
     * @param {Array} eleves - Élèves
     */
    async tirageLotsRestants(lotsRestants, eleves) {
        await this.attribuerLotsAuxEleves(lotsRestants, eleves);
    },

    /**
     * Attribuer les lots aux élèves et supprimer les autres tickets s'ils existent
     * @param {Array} lots - Lots à attribuer
     * @param {Array} eleves - Élèves à qui attribuer les lots
     * @returns {Promise<Eleve[]>} - Liste des gagnants
     */
    async attribuerLotsAuxEleves(lots, eleves) {
        for (const lot of lots) {
            if (eleves.length > 0) { // Vérification s'il reste des élèves à qui attribuer des lots
                const randomIndex = Math.floor(Math.random() * eleves.length);
                const randomEleve = eleves[randomIndex];

                lot.gagnant_e = randomEleve.pseudoDiscord;
                await LotService.updateGagnant_e(lot, lot.id);

                // Supprime toutes les entrées de l'élève
                await EleveService.deleteAllTickets(randomEleve.pseudoDiscord);

                // Supprimer tous les élèves ayant le même pseudoDiscord
                eleves = eleves.filter(eleve => eleve.pseudoDiscord !== randomEleve.pseudoDiscord);
            }
        }
    },

    /**
     * On vérifie que le tirage au sort est valide
     * @returns {Promise<boolean>} résultat du tirage
     */
    async checkIfTirageIsOk() {
        const lotsTires = await LotService.findALl();

        // On vérifie qu'aucun lot ne reste sans gagnant
        const isLotSansGagnant = lotsTires.filter(lot => !lot.gagnant_e)
        if (isLotSansGagnant.length > 0) {
            console.error("Attention, il reste un ou des lot(s) sans gagnant(e) : " + isLotSansGagnant);
        }


        // On vérifie qu'il n'y a pas 1 élève qui a gagné 2 fois
        const gagnants = new Set(); // Un Set pour stocker les gagnants uniques
        for (const lot of lotsTires) {
            if (lot.gagnant_e) {
                if (gagnants.has(lot.gagnant_e)) { // Vérification si le gagnant est déjà dans le Set
                    console.error(`Erreur: ${lot.gagnant_e} a gagné deux lots ou + !`);
                    return false; // Le tirage n'est pas valide
                } else {
                    gagnants.add(lot.gagnant_e);
                }
            }
        }

        return true; // Le tirage est valide
    },

    /*
    *******************************************************************************
    *                                                                             *
    *                          Tirage au sort par étapes                          *
    *                                                                             *
    *******************************************************************************
    */

    async tirageLots() {
        await this.tirageLotsPhysiquesFrance();
        await this.tirageLotsPhysiquesFcEtUE();
        await this.tirageLotsPhysiquesMonde();
        await this.tirageLotsDematerialises();

        const resultatTirage = await this.checkIfTirageIsOk();
        console.log("resultatTirage : " + resultatTirage);
    },

    /**
     * ÉTAPE 1
     * Tirage au sort des lots physiques pour la France métropolitaine
     */
    async tirageLotsPhysiquesFrance() {
        const lotsPhysFc = await LotService.findByPhysiqueAndFrance();
        const elevesFc = await EleveService.findByFrance();

        // Lots Physiques Fc métropolitaine avec critères de maison
        await this.tirageLotsByMaison(lotsPhysFc, elevesFc);

        // Récupération des lots physiques France métropolitaine restants après tirage par maison
        const lotsPhysFcRestants = await LotService.findByPhysiqueAndFrance();

        // Mise à jour de la liste des élèves restants
        const elevesRestants = await EleveService.findByFrance();

        // Lots Physiques France métropolitaine restants
        await this.tirageLotsRestants(lotsPhysFcRestants, elevesRestants);
    },

    /**
     * ÉTAPE 2
     * Tirage au sort des lots physiques pour l'UE
     */
    async tirageLotsPhysiquesFcEtUE() {
        const lotsPhysFcAndUE = await LotService.findByPhysiqueFcEtUE();
        const elevesFcOrUE = await EleveService.findByFranceOrUE();

        // Tirage des lots par maison
        await this.tirageLotsByMaison(lotsPhysFcAndUE, elevesFcOrUE);

        // Récupération des lots physiques UE restants
        const lotsRestants = await LotService.findByPhysiqueFcEtUE();

        // Mise à jour de la liste des élèves restants
        const elevesRestants = await EleveService.findByFranceOrUE();

        // Tirage du reste des lots
        await this.tirageLotsRestants(lotsRestants, elevesRestants);
    },

    /**
     * ÉTAPE 3
     * Tirage au sort des lots pour le reste du monde
     */
    async tirageLotsPhysiquesMonde() {
        const lotsPhysMonde = await LotService.findByPhysiqueMonde();
        const eleves = await EleveService.findALl();

        // Tirage des lots par maison
        await this.tirageLotsByMaison(lotsPhysMonde, eleves);

        // Récupération des lots physiques restants
        const lotsRestants = await LotService.findByPhysiqueMonde();

        // Mise à jour de la liste des élèves restants
        const elevesRestants = await EleveService.findALl();

        // Tirage du reste des lots
        await this.tirageLotsRestants(lotsRestants, elevesRestants);
    },


    /**
     * ÉTAPE 4
     * Tirage au sort des lots dématérialisés
     */
    async tirageLotsDematerialises() {
        const lotsDematerialises = await LotService.findByNonPhysique();
        const eleves = await EleveService.findALl();

        // Tirage des lots par maison
        await this.tirageLotsByMaison(lotsDematerialises, eleves);

        // Mise à jour de la liste des élèves restants
        const elevesRestants = await EleveService.findALl();

        // Récupération des lots dématérialisés restants
        const lotsRestants = await LotService.findByNonPhysique();

        // Tirage du reste des lots
        await this.tirageLotsRestants(lotsRestants, elevesRestants);
    }
}

module.exports = TirageAuSortService;
