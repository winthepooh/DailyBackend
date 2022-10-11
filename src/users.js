let jwt = require("jsonwebtoken");
let database = require("../src/db");

function verifyUser(accessToken) {
  let key = process.env.SECRET_KEY;
  try {
    let verify = jwt.verify(accessToken, key);
    if (verify) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

function checkActive(userid, callback) {
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
}

function verifyAndActive(userid, accessToken, callback) {
  if (!userid) return callback("User id is null", 400);
  this.checkActive(userid, (res) => {
    if (res && verifyUser(accessToken) && jwt.decode(accessToken) == userid) {
      return callback("", 200);
    } else {
      return callback("Unautherize access!", 401);
    }
  });
}

function checkAdmin(userid, callback) {
  database.query(
    `SELECT * FROM users WHERE id = '${userid}' && active = '1' && admin = '1'`,
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
}

function verifyAndAdmin(userid, accessToken, callback) {
  if (!userid) return callback("User id is null", 400);
  this.checkAdmin(userid, (res) => {
    if (res && verifyUser(accessToken) && jwt.decode(accessToken) == userid) {
      return callback("", 200);
    } else {
      return callback("Unautherize access!", 401);
    }
  });
}

module.exports = {
  verifyUser,
  checkActive,
  verifyAndActive,
  checkAdmin,
  verifyAndAdmin,
};
