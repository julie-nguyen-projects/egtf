const TirageService = require('../services/tirageAuSortService')

const TirageController = {
    async tirageLotsPhysiquesFrance() {
        return await TirageService.tirageLots();
    }

}

module .exports = TirageController;
