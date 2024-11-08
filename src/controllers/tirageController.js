const TirageService = require('../services/tirageAuSortService')

const TirageController = {
    async tirageLotsPhysiquesFrance() {
        await TirageService.tirageLotsPhysiquesFrance();
    }

}

module .exports = TirageController;
