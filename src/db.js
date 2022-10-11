let mysql = require("mysql");
let config = require("./config");

const database = mysql.createConnection(config.db);
database.connect();

module.exports = database;
