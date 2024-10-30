const uploadFileService = require('../services/uploadFileService');

const addLotsFromCsvFile = (file) => {
    uploadFileService.addLotsFromCsvFile(file);
}

module.exports = {
    addLotsFromCsvFile
}
