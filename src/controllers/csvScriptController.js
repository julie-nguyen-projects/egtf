const csvScriptService = require('../services/csvScriptService');

const CsvScriptController = {
     addLotsFromCsvFile : (file) => {
        csvScriptService.addLotsFromCsvFile(file);
    },
}

module.exports = CsvScriptController;
