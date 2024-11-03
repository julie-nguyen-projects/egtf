const csvScriptService = require('../services/csvScriptService');

const CsvScriptController = {
     addLotsFromCsvFile : (file) => {
        csvScriptService.addLotsFromCsvFile(file);
    },

    addElevesFromCsvFile(file) {
        csvScriptService.addElevesFromCsvFile(file);
    }
}

module.exports = CsvScriptController;
