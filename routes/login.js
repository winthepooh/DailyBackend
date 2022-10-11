let express = require("express");
let router = express.Router();
let database = require("../src/db");
let jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  let username = req.body.username;
  let password = jwt.sign(req.body.password, process.env.SECRET_KEY);

  database.query(
    `SELECT * FROM users WHERE username = '${username}' && password = '${password}' && active = '1'`,
    (error, result, field) => {
      if (error) throw error;
      if (result.length == 0) {
        return res.status(400).send({
          error: true,
          message: "Error! account inactive or wrong information!",
        });
      } else {
        let token = jwt.sign(result[0].id, process.env.SECRET_KEY);
        return res.send({
          userid: result[0].id,
          nickname: result[0].name,
          avatar: result[0].img,
          admin: result[0].admin,
          accessToken: token,
        });
      }
    }
  );
});

module.exports = router;
