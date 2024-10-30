const csvScriptService = require('../services/csvScriptService');

const addLotsFromCsvFile = (file) => {
    csvScriptService.addLotsFromCsvFile(file);
}

module.exports = {
    addLotsFromCsvFile
}
