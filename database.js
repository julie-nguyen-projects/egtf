const sqlite3 = require("sqlite3").verbose();
const path = require('path');

/** DATABASE **/
const db_name = path.join(__dirname, "data", "appTest.db");
var db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connexion réussie à la base de données 'appTest.db'");
});

const sql_create = `CREATE TABLE IF NOT EXISTS Lots (
  Lot_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NomBoutique VARCHAR(100) NOT NULL,
  Livraison VARCHAR(100) NOT NULL,
  Maison VARCHAR(100) NOT NULL,
  Description TEXT
);`;

db.run(sql_create, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Création réussie de la table 'Lots'");
    // Alimentation de la table
    const sql_insert = `INSERT INTO Lots (Lot_ID, NomBoutique, Livraison, Maison, Description) VALUES
  (1, 'Boutique1', 'France', 'Serdaigle', 'test'),
  (2, 'Boutique2', 'France', 'Poufsouffle', 'test2');`;
    db.run(sql_insert, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Alimentation réussie de la table 'Lots'");
    });
});


module.exports = db;
