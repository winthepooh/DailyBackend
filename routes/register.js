let express = require("express");
let router = express.Router();
let database = require("../src/db");
let jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  let username = req.body.username;
  let password = jwt.sign(req.body.password, process.env.SECRET_KEY);
  let email = req.body.email;
  let nickname = req.body.nickname;
  let avatar = req.body.avatar;

  database.query(
    `INSERT INTO users(username, password, name, img, email) VALUES ('${username}','${password}','${nickname}','${avatar}','${email}')`,
    (error, result, field) => {
      if (error) throw error;
      return res.send({
        error: false,
        userid: result.insertId,
        nickname: nickname,
        avatar: avatar,
        admin: false,
        accessToken: jwt.sign(result.insertId, process.env.SECRET_KEY),
      });
    }
  );
});

module.exports = router;
