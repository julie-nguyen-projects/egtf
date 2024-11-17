const TirageService = require('../services/tirageAuSortService')

const TirageController = {
    async tirageLotsPhysiquesFrance() {
        await TirageService.tirageLots();
    }

}

module .exports = TirageController;
