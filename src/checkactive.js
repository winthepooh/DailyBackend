let jwt = require("jsonwebtoken");
let database = require("../src/db");

module.exports = async function (userid, callback) {
  database.query(
    `SELECT * FROM users WHERE id = '${userid}' && active = '1'`,
    (error, result, field) => {
      let res = null;
      if (result.length == 0) {
        res = callback(false);
      } else {
        res = callback(true);
      }
      return res;
    }
  );
};
