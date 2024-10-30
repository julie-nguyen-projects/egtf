const fs = require("fs");
const {parse} = require("csv-parse");
const LotService = require('./lotService');

const CsvScriptService = {
    addLotsFromCsvFile : (file) => {
        fs.createReadStream(file.path)
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                let nomBoutique = row[0];
                let description = row [1];
                let physique = row[2];
                let livraison = row[3];
                let maison = row[4];

               LotService.createWithCompleteFields(nomBoutique, maison, description, livraison, physique);
            });

    }
}


module.exports = CsvScriptService;
